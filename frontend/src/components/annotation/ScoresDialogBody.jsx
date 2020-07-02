import React, { useContext, useEffect, useState } from "react";
import { Classes } from "@blueprintjs/core";
import PropTypes from "prop-types";
import ScoresTable from "./ScoresTable";
import PolyglotContext from "../../js/polyglotContext";
import { computeScores } from "../../api/routes";
import AppToaster from "../../js/toaster";

const ScoresDialogBody = ({ annotations, goldAnnotations }) => {
  const t = useContext(PolyglotContext);

  const [scores, setScores] = useState(null);

  useEffect(() => {
    if (annotations.length === 0 || goldAnnotations === null) return;

    computeScores({
      computedAnnotations: goldAnnotations,
      goldAnnotations: annotations,
    })
      .then((response) => setScores(response.data))
      .catch(() => {
        AppToaster.show({
          message: t("main.computing_scores_failed_toast"),
          intent: "danger",
        });
      });
  }, [t, annotations, goldAnnotations]);

  return (
    <div className={Classes.DIALOG_BODY}>
      <p>
        {t("annotation.scores_description")}
        <br />
        {t("annotation.scores_note")}
      </p>
      {scores !== null && <ScoresTable scores={scores} />}
    </div>
  );
};

ScoresDialogBody.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  goldAnnotations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ScoresDialogBody;
