import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./ScoresDialog.sass";
import { Dialog, Classes } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";
import ScoresTable from "./ScoresTable";

const ScoresDialog = ({ scores }) => {
  const t = useContext(PolyglotContext);

  const [showDialog, setShowDialog] = useState(false);

  return (
    <div>
      <Dialog
        onClose={() => setShowDialog(false)}
        isOpen={showDialog}
        icon="predictive-analysis"
        title={t("annotation.scores")}
        canOutsideClickClose
        canEscapeKeyClose
        isCloseButtonShown
        className="dialog"
      >
        <div className={Classes.DIALOG_BODY}>
          <p>
            {t("annotation.scores_description")}
            <br />
            {t("annotation.scores_note")}
          </p>
          <ScoresTable scores={scores} />
        </div>
      </Dialog>
      <div
        role="button"
        tabIndex="0"
        className="score-footer"
        onClick={() => setShowDialog(true)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) setShowDialog(true);
        }}
      >
        {t("annotation.scores")}
      </div>
    </div>
  );
};

ScoresDialog.propTypes = {
  scores: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ScoresDialog;
