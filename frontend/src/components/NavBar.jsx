import React, { useContext } from "react";
import "./NavBar.sass";
import PolyglotContext from "../js/polyglotContext";
import { ReactComponent as LogoSvg } from "../logo.svg";

const NavBar = () => {
  const t = useContext(PolyglotContext);

  return (
    <div>
      <nav className="bp3-navbar bp3-dark">
        <div className="bp3-navbar-group bp3-align-left">
          <LogoSvg className="logo" />
          <div className="bp3-navbar-heading heading">
            OPEN<b>REDACT</b>
          </div>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          <button
            className="bp3-button bp3-minimal bp3-icon-help"
            type="button"
            title={t("nav.help")}
          />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
