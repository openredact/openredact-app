import React, { useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import AnnotationControl from "./annotation/Control";
import PreviewControl from "./preview/Control";
import "./MainView.sass";
import API from "./api";

const MainView = () => {
  const [tokenization, setTokenization] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [whitespace, setWhitespace] = useState([]);
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
        startChar: tokenization[myAnnotation.start].start_char,
        endChar: tokenization[myAnnotation.end - 1].end_char,
        text: "XXX",
      };
    });

    setAnonymizations(newAnonymizations);
  }, [tokenization, annotations]);

  const onAnnotationsChange = (newAnnotations) => {
    setAnnotations(newAnnotations);
  };

  const onCancel = () => {
    setTokens([]);
    setWhitespace([]);
    setAnnotations([]);
    setAnonymizations([]);
    setTokenization([]);
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
        const myTokens = response.data.tokens.map((token) => token.text);
        setTokens(myTokens);
        const myWhitespace = response.data.tokens.map((token) => token.has_ws);
        setWhitespace(myWhitespace);
        setTokenization(response.data.tokens);

        const myAnnotations = response.data.piis.map((pii) => {
          const annotation = {};
          annotation.start = pii.start_tok;
          annotation.end = pii.end_tok;
          annotation.tag = pii.tag;
          return annotation;
        });
        setAnnotations(myAnnotations);
        onAnnotationsChange(myAnnotations);

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
        onAnnotationsChange={onAnnotationsChange}
        onFileDrop={onFileDrop}
        onCancel={onCancel}
        isLoading={isLoading}
      />
      <PreviewControl
        tokens={tokens}
        anonymizations={anonymizations}
        whitespace={whitespace}
        onDownload={onDownload}
      />
    </div>
  );
};

export default MainView;
