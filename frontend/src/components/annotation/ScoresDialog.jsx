import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Dialog } from "@blueprintjs/core";
import "./ScoresDialog.sass";
import PolyglotContext from "../../js/polyglotContext";
import ScoresDialogButton from "./ScoresDialogButton";
import ScoresDialogBody from "./ScoresDialogBody";

const ScoresDialog = ({ annotations, goldAnnotations }) => {
  const t = useContext(PolyglotContext);

  const [showDialog, setShowDialog] = useState(false);

  return (
    <div>
      <ScoresDialogButton setShowDialog={setShowDialog} />
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
        <ScoresDialogBody
          annotations={annotations}
          goldAnnotations={goldAnnotations}
        />
      </Dialog>
    </div>
  );
};

ScoresDialog.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  goldAnnotations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ScoresDialog;
