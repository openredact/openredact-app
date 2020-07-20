import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./NavBar.sass";
import {
  Button,
  NavbarGroup,
  Alignment,
  NavbarHeading,
  Classes,
} from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";
import { ReactComponent as LogoSvg } from "../logo.svg";
import SettingsDialog from "./SettingsDialog";
import AboutDialog from "./AboutDialog";

const NavBar = ({
  availableRecognizers,
  activatedRecognizers,
  setActivatedRecognizers,
}) => {
  const t = useContext(PolyglotContext);

  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div>
      <nav className={`${Classes.NAVBAR} ${Classes.DARK}`}>
        <NavbarGroup align={Alignment.LEFT}>
          <LogoSvg className="logo" />
          <NavbarHeading>
            OPEN<b>REDACT</b>
          </NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <Button
            icon="cog"
            title={t("nav.settings")}
            minimal
            onClick={() => setShowSettings(true)}
          />
          <Button
            icon="info-sign"
            title={t("nav.about")}
            minimal
            onClick={() => setShowAbout(true)}
          />
          <Button icon="help" title={t("nav.help")} minimal />
        </NavbarGroup>
      </nav>
      <SettingsDialog
        availableRecognizers={availableRecognizers}
        activatedRecognizers={activatedRecognizers}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        setActivatedRecognizers={setActivatedRecognizers}
      />
      <AboutDialog setShowAbout={setShowAbout} showAbout={showAbout} />
    </div>
  );
};

NavBar.propTypes = {
  availableRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  activatedRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setActivatedRecognizers: PropTypes.func.isRequired,
};

export default NavBar;
