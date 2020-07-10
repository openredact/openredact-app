import React, { useContext, useEffect, useState } from "react";
import "./App.sass";
import NavBar from "./NavBar";
import AnonymizationConfigMenu from "./anonymizationConfig/AnonymizationConfigMenu";
import Main from "./Main";
import PolyglotContext from "../js/polyglotContext";
import { fetchRecognizers, fetchTags } from "../api/routes";
import AppToaster from "../js/toaster";
import useLocalStorage from "../js/useLocalStorage";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  const t = useContext(PolyglotContext);

  const [tags, setTags] = useState([]);
  const [availableRecognizers, setAvailableRecognizers] = useState([]);
  const [activatedRecognizers, setActivatedRecognizers] = useLocalStorage(
    "activatedRecognizers",
    []
  );
  const [anonymizationConfig, setAnonymizationConfig] = useLocalStorage(
    "anonymizationConfig",
    {
      defaultMechanism: { mechanism: "suppression", suppressionChar: "X" },
      mechanismsByTag: {},
    }
  );

  useEffect(() => {
    fetchRecognizers()
      .then((response) => {
        setAvailableRecognizers(response.data);
      })
      .catch(() => {
        AppToaster.show({
          message: t("app.fetching_recognizers_failed_toast"),
          intent: "danger",
        });
      });
  }, [t]);

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
    <div>
      <NavBar
        availableRecognizers={availableRecognizers}
        activatedRecognizers={activatedRecognizers}
        setActivatedRecognizers={setActivatedRecognizers}
      />
      <div className="grid-container">
        <ErrorBoundary>
          <AnonymizationConfigMenu
            tags={tags}
            config={anonymizationConfig}
            setConfig={setAnonymizationConfig}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <Main tags={tags} anonymizationConfig={anonymizationConfig} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
