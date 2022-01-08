import { useCallback, useContext, useEffect, useState } from "react";
import { anonymizePiis } from "../api/routes";
import Anonymization from "./anonymization";
import AppToaster from "./toaster";
import PolyglotContext from "./polyglotContext";

function computePositionsMap(annotations, paragraphs) {
  // Iterate over all paragraphs
  return Object.keys(paragraphs).map(function (p, paragraphIndex) {
    return new Map(
      // Generate position map for each paragraph + annotations
      annotations[paragraphIndex].map((annotation) => {
        return [
          annotation.id,
          {
            start: annotation.start,
            end: annotation.end,
            startChar:
              paragraphs[paragraphIndex].tokens[annotation.start].startChar,
            endChar:
              paragraphs[paragraphIndex].tokens[annotation.end - 1].endChar,
          },
        ];
      })
    );
  });
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

function useAnonymization({ paragraphs, annotations, anonymizationConfig }) {
  const t = useContext(PolyglotContext);

  const [anonymizations, setAnonymizations] = useState([]);

  const computeSpecialTagsCallback = useCallback(computeSpecialTags, [
    anonymizationConfig,
  ]);
  const computePositionsMapCallback = useCallback(computePositionsMap, [
    annotations,
    paragraphs,
  ]);

  useEffect(() => {
    if (annotations.length === 0 || annotations[0].length === 0) {
      setAnonymizations([]);
      return;
    }

    const paragraphAnnotations = annotations[0];

    const sortedAnnotations = paragraphAnnotations.sort(
      (a, b) => a.start - b.start
    );

    const piis = sortedAnnotations.map((annotation) => {
      return { tag: annotation.tag, text: annotation.text, id: annotation.id };
    });

    const [tagsToNotAnonymize, tagsAnonymizedWithDefault] =
      computeSpecialTagsCallback(anonymizationConfig);

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

    const positionsMap = computePositionsMapCallback(annotations, paragraphs);
    //
    anonymizePiis({
      piis: piisToAnonymize,
      config: configForRequest,
    })
      .then((response) => {
        const { anonymizedPiis } = response.data;

        const newAnonymizations = anonymizedPiis.map((anonymizedPii) => {
          return new Anonymization({
            // TODO paragraph support
            ...positionsMap[0].get(anonymizedPii.id),
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
    paragraphs,
    annotations,
    anonymizationConfig,
    computePositionsMapCallback,
    computeSpecialTagsCallback,
  ]);

  return anonymizations;
}

export default useAnonymization;
