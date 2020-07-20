import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./MainMenu.sass";
import { Button } from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";

const MainMenu = ({ onNewDocument, showDownloadButton, onDownload }) => {
  const t = useContext(PolyglotContext);

  return (
    <div className="main-menu">
      <Button intent="primary" onClick={onNewDocument}>
        {t("main.new_document")}
      </Button>
      {showDownloadButton && (
        <Button
          className="download-button"
          intent="success"
          onClick={onDownload}
        >
          {t("main.download")}
        </Button>
      )}
    </div>
  );
};

MainMenu.propTypes = {
  showDownloadButton: PropTypes.bool.isRequired,
  onNewDocument: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default MainMenu;
