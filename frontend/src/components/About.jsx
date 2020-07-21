import React, { useContext, useState } from "react";
import { Button } from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";
import AboutDialog from "./AboutDialog";

const About = () => {
  const t = useContext(PolyglotContext);

  const [showAbout, setShowAbout] = useState(false);

  return (
    <div>
      <Button
        icon="info-sign"
        title={t("nav.about")}
        minimal
        onClick={() => setShowAbout(true)}
      />
      <AboutDialog showAbout={showAbout} setShowAbout={setShowAbout} />
    </div>
  );
};

export default About;
