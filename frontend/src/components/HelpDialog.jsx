import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Classes, Dialog, OL } from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";
import Disclaimer from "./Disclaimer";
import "./HelpDialog.sass";

const HelpDialog = ({ showHelp, setShowHelp }) => {
  const t = useContext(PolyglotContext);
  return (
    <Dialog
      onClose={() => setShowHelp(false)}
      isOpen={showHelp}
      icon="help"
      title={t("nav.help")}
      canOutsideClickClose
      canEscapeKeyClose
      isCloseButtonShown
    >
      <div className={Classes.DIALOG_BODY}>
        <Disclaimer />
        <p className="more-vertical-space">{t("help.intro")}</p>
        <OL>
          <li>{t("help.item1")}</li>
          <li>{t("help.item2")}</li>
          <li>{t("help.item3")}</li>
          <li>{t("help.item4")}</li>
        </OL>
        <p>{t("help.tip")}</p>
      </div>
    </Dialog>
  );
};

HelpDialog.propTypes = {
  showHelp: PropTypes.bool.isRequired,
  setShowHelp: PropTypes.func.isRequired,
};

export default HelpDialog;
