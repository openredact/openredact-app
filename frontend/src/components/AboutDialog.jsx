import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Classes, Dialog } from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";
import { ReactComponent as LogoSvg } from "../logo.svg";
import "./AboutDialog.sass";
import Disclaimer from "./Disclaimer";

const AboutDialog = ({ showAbout, setShowAbout }) => {
  const t = useContext(PolyglotContext);

  return (
    <Dialog
      onClose={() => setShowAbout(false)}
      isOpen={showAbout}
      icon="info-sign"
      title={t("nav.about")}
      canOutsideClickClose
      canEscapeKeyClose
      isCloseButtonShown
    >
      <div className="logo-background">
        <LogoSvg className="logo" />
      </div>
      <div className={Classes.DIALOG_BODY}>
        <Disclaimer />
        <p className="more-vertical-space">
          <a href="https://openredact.org">OpenRedact</a>
          {t("about.description1")}
          <a href="https://prototypefund.de">Prototype Fund</a>
          {t("about.description2")}
        </p>
        <p className="copyright">
          © Pascal Berrang, Jonas Langhabel, Malte Ostendorff {t("about.and")}{" "}
          Saskia Ostendorff
        </p>
      </div>
    </Dialog>
  );
};

AboutDialog.propTypes = {
  showAbout: PropTypes.bool.isRequired,
  setShowAbout: PropTypes.func.isRequired,
};

export default AboutDialog;
