import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./RecognizerConfigDialog.sass";
import { Classes, Dialog, Switch } from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";

const RecognizerConfigDialog = ({
  availableRecognizers,
  showIdentifierConfig,
  setShowIdentifierConfig,
  activatedRecognizers,
  setActivatedRecognizers,
}) => {
  const t = useContext(PolyglotContext);

  if (availableRecognizers.length === 0 || activatedRecognizers === null)
    return null;

  const onSwitch = (recognizer) => () => {
    const activatedRecognizersClone = [...activatedRecognizers];
    if (!activatedRecognizers.includes(recognizer)) {
      activatedRecognizersClone.push(recognizer);
    } else {
      const index = activatedRecognizersClone.indexOf(recognizer);
      activatedRecognizersClone.splice(index, 1);
    }
    setActivatedRecognizers(activatedRecognizersClone);
  };

  const recognizerSwitches = availableRecognizers.map((recognizer) => (
    <li key={recognizer}>
      <Switch
        checked={activatedRecognizers.includes(recognizer)}
        label={recognizer}
        onChange={onSwitch(recognizer)}
        large
      />
    </li>
  ));

  return (
    <Dialog
      className="dialog"
      onClose={() => setShowIdentifierConfig(false)}
      isOpen={showIdentifierConfig}
      icon="cog"
      title={t("recognizer_config_dialog.title")}
      canOutsideClickClose
      canEscapeKeyClose
      isCloseButtonShown
    >
      <p className={Classes.DIALOG_BODY}>
        {t("recognizer_config_dialog.description")}
      </p>
      <ul className="recognizer-list">{recognizerSwitches}</ul>
    </Dialog>
  );
};

RecognizerConfigDialog.propTypes = {
  availableRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  showIdentifierConfig: PropTypes.bool.isRequired,
  setShowIdentifierConfig: PropTypes.func.isRequired,
  activatedRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setActivatedRecognizers: PropTypes.func.isRequired,
};

export default RecognizerConfigDialog;
