import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./MainMenu.sass";
import { Button } from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";

const MainMenu = ({
  onNewDocument,
  showDownloadButton,
  onDownload,
  onShowScores,
  showCompileButton,
  isCompiling,
  onCompile,
}) => {
  const t = useContext(PolyglotContext);

  return (
    <div className="main-menu">
      <div className="annotation-menu">
        <Button
          icon="document"
          intent="primary"
          className="new-document-button"
          onClick={() => {
            if (window.confirm(t("main.new_document_confirm"))) {
              onNewDocument();
            }
          }}
        >
          {t("main.new_document")}
        </Button>
        {showDownloadButton && (
          <Button icon="chart" className="scores-button" onClick={onShowScores}>
            {t("annotation.scores")}
          </Button>
        )}
      </div>
      <div className="preview-menu">
        <div>
          {showCompileButton && (
            <Button
              icon="refresh"
              className="compile-button"
              intent="success"
              onClick={onCompile}
              loading={isCompiling}
            >
              Compile
            </Button>
          )}
        </div>
        {showDownloadButton && (
          <Button
            icon="download"
            className="download-button"
            intent="success"
            onClick={onDownload}
          >
            {t("main.download")}
          </Button>
        )}
      </div>
    </div>
  );
};

MainMenu.propTypes = {
  showDownloadButton: PropTypes.bool.isRequired,
  onNewDocument: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onShowScores: PropTypes.func.isRequired,
  showCompileButton: PropTypes.bool.isRequired,
  isCompiling: PropTypes.bool.isRequired,
  onCompile: PropTypes.func.isRequired,
};

export default MainMenu;
