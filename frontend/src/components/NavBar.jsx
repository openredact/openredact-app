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
import IdentifierConfigDialog from "./IdentifierConfigDialog";

const NavBar = ({
  availableRecognizers,
  activatedRecognizers,
  setActivatedRecognizers,
}) => {
  const t = useContext(PolyglotContext);

  const [showIdentifierConfig, setShowIdentifierConfig] = useState(false);

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
          <Button icon="help" title={t("nav.help")} minimal />
          <Button
            icon="cog"
            title={t("nav.settings")}
            minimal
            onClick={() => setShowIdentifierConfig(true)}
          />
        </NavbarGroup>
      </nav>
      <IdentifierConfigDialog
        availableRecognizers={availableRecognizers}
        activatedRecognizers={activatedRecognizers}
        showIdentifierConfig={showIdentifierConfig}
        setShowIdentifierConfig={setShowIdentifierConfig}
        setActivatedRecognizers={setActivatedRecognizers}
      />
    </div>
  );
};

NavBar.propTypes = {
  availableRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  activatedRecognizers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setActivatedRecognizers: PropTypes.func.isRequired,
};

export default NavBar;
