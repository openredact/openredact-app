import React, { useContext } from "react";
import PolyglotContext from "../../js/polyglotContext";

const RandomizedResponseMechanism = () => {
  const t = useContext(PolyglotContext);

  // For now, this is only a demo for countries

  return (
    <div className="mechanism-options">
      {t("anonymization.randomized_response.no_config")}
    </div>
  );
};

export default RandomizedResponseMechanism;
