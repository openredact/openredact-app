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
    const formData = new FormData();
    formData.append("file", files[0]);
    API.post("nlp/extract-text/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      // .then((response) => {
      // console.log(response);
      const myAnnotations = [
        { start: 1, end: 2, tag: "ORG" },
        { start: 2, end: 4, tag: "PER" },
      ];
      setTokens(["My", "text", "needs", "annotating", "for", "NLP"]);
      setWhitespace([true, true, true, true, true, true]);
      setAnnotations(myAnnotations);
      onAnnotationsChange(myAnnotations);
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  return (
    <div className="main-view">
      <AnnotationControl
        tokens={tokens}
        annotations={annotations}
        onAnnotationsChange={onAnnotationsChange}
        onFileDrop={postFile}
        onCancel={onCancel}
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
