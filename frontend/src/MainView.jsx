import React, { useState } from "react";
import AnnotationControl from "./annotation/Control";
import PreviewControl from "./preview/Control";
import "./MainView.sass";
import API from "./api";

const MainView = () => {
  const [tokens, setTokens] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [anonymizations, setAnonymizations] = useState([]);

  const onAnnotationsChange = (newAnnotations) => {
    setAnnotations(newAnnotations);
    // query anonymizer backend with annotations and their tokens
    // (e.g. {text: "Foo Bar", tag: "Misc"}
    setAnonymizations([{ start: 2, end: 4, text: newAnnotations.length }]);
  };

  const onCancel = () => {
    setTokens([]);
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
      <PreviewControl tokens={tokens} anonymizations={anonymizations} />
    </div>
  );
};

export default MainView;
