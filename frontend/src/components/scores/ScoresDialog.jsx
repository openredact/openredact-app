import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Dialog } from "@blueprintjs/core";
import "./ScoresDialog.sass";
import PolyglotContext from "../../js/polyglotContext";
import ScoresDialogBody from "./ScoresDialogBody";

const ScoresDialog = ({
  showDialog,
  onClose,
  annotations,
  goldAnnotations,
}) => {
  const t = useContext(PolyglotContext);

  return (
    <Dialog
      onClose={onClose}
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
  );
};

ScoresDialog.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  goldAnnotations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ScoresDialog;
