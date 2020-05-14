import React, { useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import AnnotationControl from "./annotation/Control";
import PreviewControl from "./preview/Control";
import "./Main.sass";
import API from "./api";

const Main = () => {
  const [tokens, setTokens] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [anonymizations, setAnonymizations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileFormData = useRef({});

  useEffect(() => {
    // TODO query anonymizer backend with annotations and their tokens
    //  (e.g. {text: "Foo Bar", tag: "Misc"}
    // for now replace every annotation with XXX
    const newAnonymizations = annotations.map((myAnnotation) => {
      return {
        start: myAnnotation.start,
        end: myAnnotation.end,
        startChar: tokens[myAnnotation.start].start_char,
        endChar: tokens[myAnnotation.end - 1].end_char,
        text: "XXX",
      };
    });

    setAnonymizations(newAnonymizations);
  }, [tokens, annotations]);

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

    API.post("nlp/find-piis/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setTokens(response.data.tokens);

        const myAnnotations = response.data.piis.map((pii) => {
          const annotation = {};
          annotation.start = pii.start_tok;
          annotation.end = pii.end_tok;
          annotation.tag = pii.tag;
          return annotation;
        });
        setAnnotations(myAnnotations);

        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onDownload = () => {
    const formData = fileFormData.current;
    formData.set("anonymizations", JSON.stringify(anonymizations));
    API.post("file/anonymize/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    })
      .then((response) => {
        const blob = new Blob([response.data]);
        saveAs(blob, formData.get("file").name);
      })
      .catch
      // TODO
      ();
  };

  return (
    <div className="main-view">
      <AnnotationControl
        tokens={tokens}
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
    </div>
  );
};

export default Main;
