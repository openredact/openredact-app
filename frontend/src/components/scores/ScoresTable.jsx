import React, { useContext } from "react";
import PropTypes from "prop-types";
import { HTMLTable } from "@blueprintjs/core";
import PolyglotContext from "../../js/polyglotContext";

const ScoresTable = ({ scores }) => {
  const t = useContext(PolyglotContext);

  const tableValues = new Map();
  const metrics = new Set();
  const tags = [];

  function extractTableValues(metricsObject, tag) {
    tags.push(tag);
    Object.entries(metricsObject).forEach((metricsEntry) => {
      const [metricName, metricValue] = metricsEntry;
      tableValues.set(
        `${tag}-${metricName}`,
        ["f1", "f2", "precision", "recall"].includes(metricName)
          ? metricValue.toFixed(2)
          : metricValue
      );
      metrics.add(metricName);
    });
  }

  extractTableValues(scores.total, "total");

  Object.entries(scores.tags).forEach((scoresEntry) => {
    const [tag, metricsObject] = scoresEntry;
    if (metricsObject === null) return;
    extractTableValues(metricsObject, tag);
  });

  const tableHeader = (
    <tr>
      {[<td key="0" />].concat(
        [...metrics].map((item) => (
          <th key={item}>{t(`annotation.metric.${item}`)}</th>
        ))
      )}
    </tr>
  );
  const tableBody = tags.map((tag) => (
    <tr key={tag}>
      <th>{tag.toUpperCase()}</th>
      {[...metrics].map((metricName) => (
        <td key={metricName}>
          {tableValues.has(`${tag}-${metricName}`)
            ? tableValues.get(`${tag}-${metricName}`)
            : t("annotation.na")}
        </td>
      ))}
    </tr>
  ));

  return (
    <HTMLTable bordered striped>
      <thead>{tableHeader}</thead>
      <tbody>{tableBody}</tbody>
    </HTMLTable>
  );
};

ScoresTable.propTypes = {
  scores: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ScoresTable;
