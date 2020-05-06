import React from "react";
import AnnotationView from "./AnnotationView";
import AnonymizationView from "./AnonymizationView";
import "./MainView.sass";

const MainView = () => {
  return (
    <div className="main-view">
      <AnnotationView />
      <AnonymizationView />
    </div>
  );
};

export default MainView;
