import React, { useContext } from "react";
import "./NavBar.sass";
import {
  Button,
  NavbarGroup,
  Alignment,
  NavbarHeading,
} from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";
import { ReactComponent as LogoSvg } from "../logo.svg";

const NavBar = () => {
  const t = useContext(PolyglotContext);

  return (
    <nav className="bp3-navbar bp3-dark">
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

// <NavBar className="bp3-dark">
//   <NavbarGroup align={Alignment.LEFT}>
//     <LogoSvg className="logo" />
//     <NavbarHeading>
//       OPEN<b>REDACT</b>
//     </NavbarHeading>
//   </NavbarGroup>
//   <NavbarGroup align={Alignment.RIGHT}>
//     <Button
//       icon="cog"
//       title={t("nav.settings")}
//       minimal
//     />
//     <Button
//       icon="help"
//       title={t("nav.help")}
//       minimal
//     />
//   </NavbarGroup>
// </NavBar>
export default NavBar;
