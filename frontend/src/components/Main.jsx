import React, { useContext, useRef, useState } from "react";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import AnnotationControl from "./annotation/AnnotationControl";
import PreviewControl from "./preview/PreviewControl";
import "./Main.sass";
import { anonymizeFile, findPiis } from "../api/routes";
import Token from "../js/token";
import Annotation from "../js/annotation";
import AppToaster from "../js/toaster";
import PolyglotContext from "../js/polyglotContext";
import MainMenu from "./MainMenu";
import ScoresDialog from "./scores/ScoresDialog";
import useAnonymization from "../js/useAnonymization";

const Main = ({ tags, anonymizationConfig, activatedRecognizers }) => {
  const t = useContext(PolyglotContext);

  const [paragraphs, setParagraphs] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [computedAnnotations, setComputedAnnotations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScoresDialog, setShowScoresDialog] = useState(false);

  const fileFormData = useRef({});

  // const anonymizations = useAnonymization({
  //   paragraphs,
  //   annotations,
  //   anonymizationConfig,
  // });
  const anonymizations = [];

  function onNewDocument() {
    setParagraphs([]);
    setAnnotations([]);
    document.title = "OpenRedact";
  }

  function onFileDrop(files) {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("recognizers", JSON.stringify(activatedRecognizers));
    fileFormData.current = formData;

    findPiis(formData)
      .then((response) => {
        // Backend does not support paragraphs yet.
        const tokens = response.data.tokens.map(
          (token) =>
            new Token(
              token.startChar,
              token.endChar,
              token.text,
              token.hasWs,
              token.hasBr
            )
        );
        // Use a single paragraph instead.
        setParagraphs([{ htmlProps: {}, tokens: tokens }]);

        // Annotations are as well not on paragraph-level
        const myAnnotations = response.data.piis.map((pii) => {
          return new Annotation(pii.startTok, pii.endTok, pii.tag, pii.text);
        });
        //
        setAnnotations([myAnnotations]);
        setComputedAnnotations([myAnnotations]);

        setIsLoading(false);
        document.title = `OpenRedact - ${
          fileFormData.current.get("file").name
        }`;
      })
      .catch(() => {
        AppToaster.show({
          message: t("main.find_piis_failed_toast"),
          intent: "danger",
        });
        setIsLoading(false);
      });
  }

  function onDownload() {
    const formData = fileFormData.current;
    formData.set("anonymizations", JSON.stringify(anonymizations));
    anonymizeFile(formData)
      .then((response) => {
        const blob = new Blob([response.data]);
        saveAs(blob, formData.get("file").name);
      })
      .catch(() => {
        AppToaster.show({
          message: t("main.anonymize_file_failed_toast"),
          intent: "danger",
        });
      });
  }

  function onAnnotationsChange(paragraphIndex, changedParagraphAnnotations) {
    console.log("onAnnotationsChange: paragraphIndex=", paragraphIndex);
    console.log(
      " - changedParagraphAnnotations: ",
      changedParagraphAnnotations
    );

    // Convert to Annotation instances
    changedParagraphAnnotations = changedParagraphAnnotations.map((item) => {
      if (item instanceof Annotation) {
        return item;
      }

      // TODO paragraph support
      const text = paragraphs[0].tokens
        .slice(item.start, item.end)
        .reduce(
          (acc, cur, idx) =>
            acc +
            cur.text +
            (item.start + idx + 1 < item.end && cur.hasWhitespace ? " " : ""),
          ""
        );
      return new Annotation(item.start, item.end, item.tag, text);
    });

    // Update only current paragraph
    const newAnnotations = annotations;

    newAnnotations[paragraphIndex] = changedParagraphAnnotations;

    console.log("setAnnotations (new): ", newAnnotations);
    // setAnnotations(annotations => annotations.copy());
    setAnnotations(newAnnotations);
    console.log("After setAnnotations: ", annotations);
  }

  return (
    <div className="main">
      <MainMenu
        onNewDocument={onNewDocument}
        onDownload={onDownload}
        showDownloadButton={paragraphs.length > 0}
        onShowScores={() => setShowScoresDialog(true)}
      />
      <div className="main-view">
        <AnnotationControl
          paragraphs={paragraphs}
          annotations={annotations}
          // computedAnnotations={computedAnnotations}
          onAnnotationsChange={onAnnotationsChange}
          onFileDrop={onFileDrop}
          isLoading={isLoading}
          tags={tags}
        />
        <PreviewControl
          paragraphs={paragraphs}
          anonymizations={anonymizations}
        />
        <ScoresDialog
          showDialog={showScoresDialog}
          onClose={() => setShowScoresDialog(false)}
          annotations={annotations.length > 0 ? annotations[0] : []}
          goldAnnotations={
            computedAnnotations.length > 0 ? computedAnnotations[0] : []
          }
        />
      </div>
    </div>
  );
};

Main.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  anonymizationConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  activatedRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Main;
