import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./ScoresDialogButton.sass";
import PolyglotContext from "../../js/polyglotContext";

const ScoresDialogButton = ({ setShowDialog }) => {
  const t = useContext(PolyglotContext);

  return (
    <div
      role="button"
      tabIndex="0"
      className="scores-button"
      onClick={() => setShowDialog(true)}
      onKeyDown={(e) => {
        if (e.keyCode === 13) setShowDialog(true);
      }}
    >
      {t("annotation.scores")}
    </div>
  );
};

ScoresDialogButton.propTypes = {
  setShowDialog: PropTypes.func.isRequired,
};

export default ScoresDialogButton;
