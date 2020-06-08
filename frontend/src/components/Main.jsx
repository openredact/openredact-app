import React, { useContext, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import AnnotationControl from "./annotation/AnnotationControl";
import PreviewControl from "./preview/PreviewControl";
import "./Main.sass";
import { anonymizeFile, computeScores, findPiis } from "../api/routes";
import Token from "../js/token";
import Annotation from "../js/annotation";
import Anonymization from "../js/anonymization";
import AppToaster from "../js/toaster";
import PolyglotContext from "../js/polyglotContext";
import SeparatorArrow from "./SeparatorArrow";

const Main = () => {
  const t = useContext(PolyglotContext);

  const [tokens, setTokens] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [initialAnnotations, setInitialAnnotations] = useState(null);
  const [anonymizations, setAnonymizations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState({});

  const fileFormData = useRef({});

  useEffect(() => {
    // TODO query anonymizer backend with annotations and their tokens
    //  (e.g. {text: "Foo Bar", tag: "Misc"}
    // for now replace every annotation with XXX
    const newAnonymizations = annotations.map((myAnnotation) => {
      return new Anonymization(
        myAnnotation.start,
        myAnnotation.end,
        tokens[myAnnotation.start].startChar,
        tokens[myAnnotation.end - 1].endChar,
        "XXX"
      );
    });

    setAnonymizations(newAnonymizations);
  }, [tokens, annotations]);

  useEffect(() => {
    if (annotations.length === 0 || initialAnnotations === null) return;

    computeScores({
      computedAnnotations: initialAnnotations,
      goldAnnotations: annotations,
    })
      .then((response) => setScores(response.data))
      .catch(() => {
        AppToaster.show({
          message: t("main.computing_scores_failed_toast"),
          intent: "danger",
        });
      });
  }, [t, annotations, initialAnnotations]);

  const onCancel = () => {
    setTokens([]);
    setAnnotations([]);
    setAnonymizations([]);
  };

  const onFileDrop = (files) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", files[0]);
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
          return new Annotation(pii.startTok, pii.endTok, pii.tag);
        });
        setAnnotations(myAnnotations);
        setInitialAnnotations(myAnnotations);

        setIsLoading(false);
      })
      .catch(() => {
        AppToaster.show({
          message: t("main.find_piis_failed_toast"),
          intent: "danger",
        });
        setIsLoading(false);
      });
  };

  const onDownload = () => {
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
  };

  return (
    <div className="main-view">
      <AnnotationControl
        tokens={tokens}
        scores={scores}
        annotations={annotations}
        onAnnotationsChange={setAnnotations}
        onFileDrop={onFileDrop}
        onCancel={onCancel}
        isLoading={isLoading}
      />
      <PreviewControl
        tokens={tokens}
        anonymizations={anonymizations}
        onDownload={onDownload}
      />
      <SeparatorArrow />
    </div>
  );
};

export default Main;
