import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Classes, Dialog, Tab, Tabs } from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";
import ActiveRecognizerSettings from "./ActiveRecognizerSettings";

const SettingsDialog = ({
  availableRecognizers,
  showSettings,
  setShowSettings,
  activatedRecognizers,
  setActivatedRecognizers,
}) => {
  const t = useContext(PolyglotContext);

  const [selectedTabId, setSelectedTabId] = useState("recognizers");

  return (
    <Dialog
      className="dialog"
      onClose={() => setShowSettings(false)}
      isOpen={showSettings}
      icon="cog"
      title={t("nav.settings")}
      canOutsideClickClose
      canEscapeKeyClose
      isCloseButtonShown
    >
      <Tabs
        className={Classes.DIALOG_BODY}
        id="settings"
        onChange={(newTabId) => setSelectedTabId(newTabId)}
        selectedTabId={selectedTabId}
      >
        <Tab
          id="recognizers"
          title={t("settings.recognizers.title")}
          panel={
            <ActiveRecognizerSettings
              activatedRecognizers={activatedRecognizers}
              availableRecognizers={availableRecognizers}
              setActivatedRecognizers={setActivatedRecognizers}
            />
          }
        />
      </Tabs>
    </Dialog>
  );
};

SettingsDialog.propTypes = {
  availableRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  showSettings: PropTypes.bool.isRequired,
  setShowSettings: PropTypes.func.isRequired,
  activatedRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setActivatedRecognizers: PropTypes.func.isRequired,
};

export default SettingsDialog;
