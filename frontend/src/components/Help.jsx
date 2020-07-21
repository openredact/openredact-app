import React, { useContext, useState } from "react";
import { Button } from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";
import HelpDialog from "./HelpDialog";

const Help = () => {
  const t = useContext(PolyglotContext);

  const [showHelp, setShowHelp] = useState(false);

  return (
    <div>
      <Button
        icon="help"
        title={t("nav.help")}
        minimal
        onClick={() => setShowHelp(true)}
      />
      <HelpDialog showHelp={showHelp} setShowHelp={setShowHelp} />
    </div>
  );
};

export default Help;
