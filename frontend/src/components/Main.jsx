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

  const [tokens, setTokens] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [computedAnnotations, setComputedAnnotations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScoresDialog, setShowScoresDialog] = useState(false);

  const fileFormData = useRef({});

  const anonymizations = useAnonymization({
    tokens,
    annotations,
    anonymizationConfig,
  });

  function onNewDocument() {
    setTokens([]);
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
        setTokens(
          response.data.tokens.map(
            (token) =>
              new Token(token.startChar, token.endChar, token.text, token.hasWs)
          )
        );

        const myAnnotations = response.data.piis.map((pii) => {
          return new Annotation(pii.startTok, pii.endTok, pii.tag, pii.text);
        });
        setAnnotations(myAnnotations);
        setComputedAnnotations(myAnnotations);

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

  function onAnnotationsChange(modifiedAnnotations) {
    const newAnnotations = modifiedAnnotations.map((item) => {
      if (item instanceof Annotation) {
        return item;
      }

      const text = tokens
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
    setAnnotations(newAnnotations);
  }

  return (
    <div className="main">
      <MainMenu
        onNewDocument={onNewDocument}
        onDownload={onDownload}
        showDownloadButton={tokens.length > 0}
        onShowScores={() => setShowScoresDialog(true)}
      />
      <div className="main-view">
        <AnnotationControl
          tokens={tokens}
          annotations={annotations}
          computedAnnotations={computedAnnotations}
          onAnnotationsChange={onAnnotationsChange}
          onFileDrop={onFileDrop}
          isLoading={isLoading}
          tags={tags}
        />
        <PreviewControl tokens={tokens} anonymizations={anonymizations} />
        <ScoresDialog
          showDialog={showScoresDialog}
          onClose={() => setShowScoresDialog(false)}
          annotations={annotations}
          goldAnnotations={computedAnnotations}
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
