import React, { useContext, useEffect, useState } from "react";
import "./App.sass";
import NavBar from "./NavBar";
import ConfigMenu from "./config/ConfigMenu";
import Main from "./Main";
import PolyglotContext from "../js/polyglotContext";
import { polyglot, updateLocale } from "../translations/utils";
import { fetchTags } from "../api/routes";
import AppToaster from "../js/toaster";
import useLocalStorage from "../js/useLocalStorage";

const App = () => {
  updateLocale(polyglot);

  const t = useContext(PolyglotContext);

  const [tags, setTags] = useState([]);
  const [anonymizationConfig, setAnonymizationConfig] = useLocalStorage(
    "anonymizationConfig",
    {
      defaultMechanism: { mechanism: "suppression" },
      mechanismsByTag: {},
    }
  );

  useEffect(() => {
    fetchTags()
      .then((response) => {
        setTags(response.data);
      })
      .catch(() => {
        AppToaster.show({
          message: t("annotation.fetching_tags_failed_toast"),
          intent: "danger",
        });
      });
  }, [t]);

  return (
    <PolyglotContext.Provider
      value={(key, options) => polyglot.t(key, options)}
    >
      <NavBar />
      <div className="grid-container">
        <ConfigMenu
          tags={tags}
          config={anonymizationConfig}
          setConfig={setAnonymizationConfig}
        />
        <Main tags={tags} anonymizationConfig={anonymizationConfig} />
      </div>
    </PolyglotContext.Provider>
  );
};

export default App;
