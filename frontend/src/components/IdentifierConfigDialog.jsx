import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Dialog, Switch } from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";

const IdentifierConfigDialog = ({
  availableRecognizers,
  showIdentifierConfig,
  setShowIdentifierConfig,
  activatedRecognizers,
  setActivatedRecognizers,
}) => {
  const t = useContext(PolyglotContext);

  const onSwitch = (recognizer) => (event) => {
    if (event.target.value === "on") {
      if (!activatedRecognizers.includes(recognizer)) {
        setActivatedRecognizers(activatedRecognizers.push(recognizer));
      }
    }
  };

  useEffect(() => {}, [activatedRecognizers]);

  const recognizerSwitches = availableRecognizers.map((recognizer) => (
    <li>
      <Switch
        checked={
          activatedRecognizers && activatedRecognizers.includes(recognizer)
        }
        label={recognizer}
        onChange={onSwitch(recognizer)}
        large
      />
    </li>
  ));

  return (
    <Dialog
      onClose={() => setShowIdentifierConfig(false)}
      isOpen={showIdentifierConfig}
      icon="cog"
      title={t("annotation.scores")}
      canOutsideClickClose
      canEscapeKeyClose
      isCloseButtonShown
      className="dialog"
    >
      {recognizerSwitches}
    </Dialog>
  );
};

IdentifierConfigDialog.propTypes = {
  availableRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  showIdentifierConfig: PropTypes.bool.isRequired,
  setShowIdentifierConfig: PropTypes.func.isRequired,
  activatedRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setActivatedRecognizers: PropTypes.func.isRequired,
};

export default IdentifierConfigDialog;
