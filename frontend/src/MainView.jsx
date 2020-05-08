import React, { useState } from "react";
import AnnotationControl from "./annotation/Control";
import PreviewControl from "./preview/Control";
import "./MainView.sass";
import API from "./api";

const MainView = () => {
  const [tokens, setTokens] = useState([]);
  const [whitespace, setWhitespace] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [anonymizations, setAnonymizations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onAnnotationsChange = (newAnnotations) => {
    setAnnotations(newAnnotations);

    // TODO query anonymizer backend with annotations and their tokens
    //  (e.g. {text: "Foo Bar", tag: "Misc"}
    // for now replace every annotation with XXX
    const newAnonymizations = newAnnotations.map((myAnnotation) => {
      return { start: myAnnotation.start, end: myAnnotation.end, text: "XXX" };
    });

    setAnonymizations(newAnonymizations);
  };

  const onCancel = () => {
    setTokens([]);
    setWhitespace([]);
    setAnnotations([]);
    setAnonymizations([]);
  };

  const postFile = (files) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", files[0]);

    API.post("nlp/find-piis/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        const myAnnotations = response.data.piis;
        setTokens(response.data.tokens);
        setWhitespace(response.data.whitespace);
        setAnnotations(myAnnotations);
        onAnnotationsChange(myAnnotations);

        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="main-view">
      <AnnotationControl
        tokens={tokens}
        annotations={annotations}
        onAnnotationsChange={onAnnotationsChange}
        onFileDrop={postFile}
        onCancel={onCancel}
        isLoading={isLoading}
      />
      <PreviewControl
        tokens={tokens}
        anonymizations={anonymizations}
        whitespace={whitespace}
      />
    </div>
  );
};

export default MainView;
