import React from "react";
import AnnotationControl from "./annotation/Control";
import PreviewControl from "./preview/Control";
import "./MainView.sass";

const MainView = () => {
  return (
    <div className="main-view">
      <AnnotationControl />
      <PreviewControl />
    </div>
  );
};

export default MainView;
