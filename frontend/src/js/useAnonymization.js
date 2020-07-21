import { useCallback, useContext, useEffect, useState } from "react";
import { anonymizePiis } from "../api/routes";
import Anonymization from "./anonymization";
import AppToaster from "./toaster";
import PolyglotContext from "./polyglotContext";

function computePositionsMap(annotations, tokens) {
  return new Map(
    annotations.map((annotation) => {
      return [
        annotation.id,
        {
          start: annotation.start,
          end: annotation.end,
          startChar: tokens[annotation.start].startChar,
          endChar: tokens[annotation.end - 1].endChar,
        },
      ];
    })
  );
}

function computeSpecialTags(anonymizationConfig) {
  const tagsToNotAnonymize = [];
  const tagsAnonymizedWithDefault = [];

  Object.entries(anonymizationConfig.mechanismsByTag).forEach((item) => {
    const tag = item[0];
    const mechanism = item[1];
    if (mechanism.mechanism === "none") {
      tagsToNotAnonymize.push(tag);
    }
    if (mechanism.mechanism === "useDefault") {
      tagsAnonymizedWithDefault.push(tag);
    }
  });

  return [tagsToNotAnonymize, tagsAnonymizedWithDefault];
}

function useAnonymization({ tokens, annotations, anonymizationConfig }) {
  const t = useContext(PolyglotContext);

  const [anonymizations, setAnonymizations] = useState([]);
  const computeSpecialTagsCallback = useCallback(computeSpecialTags, [
    anonymizationConfig,
  ]);
  const computePositionsMapCallback = useCallback(computePositionsMap, [
    annotations,
    tokens,
  ]);

  useEffect(() => {
    if (annotations.length === 0) {
      setAnonymizations([]);
      return;
    }

    const sortedAnnotations = annotations.sort((a, b) => a.start - b.start);

    const piis = sortedAnnotations.map((annotation) => {
      return { tag: annotation.tag, text: annotation.text, id: annotation.id };
    });

    const [
      tagsToNotAnonymize,
      tagsAnonymizedWithDefault,
    ] = computeSpecialTagsCallback(anonymizationConfig);

    const configForRequest = JSON.parse(JSON.stringify(anonymizationConfig)); // deep clone
    tagsToNotAnonymize.forEach(
      (tag) => delete configForRequest.mechanismsByTag[tag]
    );
    tagsAnonymizedWithDefault.forEach(
      (tag) => delete configForRequest.mechanismsByTag[tag]
    );

    const piisToAnonymize = piis.filter(
      (pii) => !tagsToNotAnonymize.includes(pii.tag)
    );

    const positionsMap = computePositionsMapCallback(annotations, tokens);

    anonymizePiis({
      piis: piisToAnonymize,
      config: configForRequest,
    })
      .then((response) => {
        const { anonymizedPiis } = response.data;

        const newAnonymizations = anonymizedPiis.map((anonymizedPii) => {
          return new Anonymization({
            ...positionsMap.get(anonymizedPii.id),
            text: anonymizedPii.text,
          });
        });

        setAnonymizations(newAnonymizations);
      })
      .catch(() => {
        AppToaster.show({
          message: t("main.anonymizing_piis_failed_toast"),
          intent: "danger",
        });
      });
  }, [
    t,
    tokens,
    annotations,
    anonymizationConfig,
    computePositionsMapCallback,
    computeSpecialTagsCallback,
  ]);

  return anonymizations;
}

export default useAnonymization;
