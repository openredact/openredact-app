import React from "react";
import "./NavBar.sass";

const NavBar = () => {
  return (
    <div>
      <nav className="bp3-navbar bp3-dark">
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading">OpenRedact</div>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          <button
            className="bp3-button bp3-minimal bp3-icon-help"
            type="button"
          />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
