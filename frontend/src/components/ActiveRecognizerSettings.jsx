import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Switch, UL } from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";
import "./ActiveRecognizerSettings.sass";

const ActiveRecognizerSettings = ({
  availableRecognizers,
  activatedRecognizers,
  setActivatedRecognizers,
}) => {
  const t = useContext(PolyglotContext);

  if (availableRecognizers.length === 0 || activatedRecognizers === null)
    return null;

  function onSwitch(recognizer) {
    const activatedRecognizersClone = [...activatedRecognizers];
    if (!activatedRecognizers.includes(recognizer)) {
      activatedRecognizersClone.push(recognizer);
    } else {
      const index = activatedRecognizersClone.indexOf(recognizer);
      activatedRecognizersClone.splice(index, 1);
    }
    setActivatedRecognizers(activatedRecognizersClone);
  }

  const recognizerSwitches = availableRecognizers.map((recognizer) => (
    <li key={recognizer}>
      <Switch
        checked={activatedRecognizers.includes(recognizer)}
        label={t(`settings.recognizers.names.${recognizer.toLowerCase()}`)}
        onChange={() => onSwitch(recognizer)}
      />
    </li>
  ));
  return (
    <div>
      <p>{t("settings.recognizers.description")}</p>
      <UL className="recognizer-list">{recognizerSwitches}</UL>
    </div>
  );
};

ActiveRecognizerSettings.propTypes = {
  availableRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  activatedRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setActivatedRecognizers: PropTypes.func.isRequired,
};

export default ActiveRecognizerSettings;
