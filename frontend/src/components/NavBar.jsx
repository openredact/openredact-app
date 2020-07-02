import React, { useContext } from "react";
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

const NavBar = () => {
  const t = useContext(PolyglotContext);

  return (
    <nav className={`${Classes.NAVBAR} ${Classes.DARK}`}>
      <NavbarGroup align={Alignment.LEFT}>
        <LogoSvg className="logo" />
        <NavbarHeading>
          OPEN<b>REDACT</b>
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button icon="help" title={t("nav.help")} minimal />
        <Button icon="cog" title={t("nav.settings")} minimal />
      </NavbarGroup>
    </nav>
  );
};

export default NavBar;
