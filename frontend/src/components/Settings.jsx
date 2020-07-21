import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@blueprintjs/core";
import SettingsDialog from "./SettingsDialog";
import PolyglotContext from "../js/polyglotContext";

const Settings = ({
  availableRecognizers,
  activatedRecognizers,
  setActivatedRecognizers,
}) => {
  const t = useContext(PolyglotContext);

  const [showSettings, setShowSettings] = useState(false);

  return (
    <div>
      <Button
        icon="cog"
        title={t("nav.settings")}
        minimal
        onClick={() => setShowSettings(true)}
      />

      <SettingsDialog
        availableRecognizers={availableRecognizers}
        activatedRecognizers={activatedRecognizers}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        setActivatedRecognizers={setActivatedRecognizers}
      />
    </div>
  );
};

Settings.propTypes = {
  availableRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  activatedRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setActivatedRecognizers: PropTypes.func.isRequired,
};

export default Settings;
