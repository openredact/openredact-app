import React, { useContext } from "react";
import { Callout } from "@blueprintjs/core";
import PolyglotContext from "../js/polyglotContext";

const Disclaimer = () => {
  const t = useContext(PolyglotContext);

  return (
    <Callout title={t("disclaimer.title")} intent="warning">
      {t("disclaimer.text")}
    </Callout>
  );
};

export default Disclaimer;
