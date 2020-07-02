import React, { useContext, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import AnnotationControl from "./annotation/AnnotationControl";
import PreviewControl from "./preview/PreviewControl";
import "./Main.sass";
import { anonymizeFile, findPiis, anonymizePiis } from "../api/routes";
import Token from "../js/token";
import Annotation from "../js/annotation";
import Anonymization from "../js/anonymization";
import AppToaster from "../js/toaster";
import PolyglotContext from "../js/polyglotContext";
import SeparatorArrow from "./SeparatorArrow";

const Main = ({ tags, anonymizationConfig }) => {
  const t = useContext(PolyglotContext);

  const [tokens, setTokens] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [computedAnnotations, setComputedAnnotations] = useState([]);
  const [anonymizations, setAnonymizations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileFormData = useRef({});

  useEffect(() => {
    const createPositionsMap = () => {
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
    };

    const computeTagsToNotAnonymizeAndDefaults = () => {
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
    };

    if (annotations.length === 0) return;

    const positionsMap = createPositionsMap();
    const piis = annotations.map((annotation) => {
      return { tag: annotation.tag, text: annotation.text, id: annotation.id };
    });

    const [
      tagsToNotAnonymize,
      tagsAnonymizedWithDefault,
    ] = computeTagsToNotAnonymizeAndDefaults();

    const configForRequest = JSON.parse(JSON.stringify(anonymizationConfig)); // deep clone
    tagsToNotAnonymize.forEach(
      (tag) => delete configForRequest.mechanismsByTag[tag]
    );
    tagsAnonymizedWithDefault.forEach(
      (tag) => delete configForRequest.mechanismsByTag[tag]
    );

    if (anonymizationConfig.defaultMechanism.mechanism === "none") {
      delete configForRequest.defaultMechanism;
    }

    const piisToAnonymize = piis.filter(
      (pii) => !tagsToNotAnonymize.includes(pii.tag)
    );

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
  }, [t, tokens, annotations, anonymizationConfig]);

  function onCancel() {
    setTokens([]);
    setAnnotations([]);
    setAnonymizations([]);
    document.title = "OpenRedact";
  }

  function onFileDrop(files) {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", files[0]);
    fileFormData.current = formData;

    findPiis(formData)
      .then((response) => {
        setTokens(
          response.data.tokens.map(
            (token) =>
              new Token(token.startChar, token.endChar, token.text, token.hasWs)
          )
        );

        const myAnnotations = response.data.piis.map((pii) => {
          return new Annotation(pii.startTok, pii.endTok, pii.tag, pii.text);
        });
        setAnnotations(myAnnotations);
        setComputedAnnotations(myAnnotations);

        setIsLoading(false);
        document.title = `OpenRedact - ${
          fileFormData.current.get("file").name
        }`;
      })
      .catch(() => {
        AppToaster.show({
          message: t("main.find_piis_failed_toast"),
          intent: "danger",
        });
        setIsLoading(false);
      });
  }

  function onDownload() {
    const formData = fileFormData.current;
    formData.set("anonymizations", JSON.stringify(anonymizations));
    anonymizeFile(formData)
      .then((response) => {
        const blob = new Blob([response.data]);
        saveAs(blob, formData.get("file").name);
      })
      .catch(() => {
        AppToaster.show({
          message: t("main.anonymize_file_failed_toast"),
          intent: "danger",
        });
      });
  }

  function onAnnotationsChange(modifiedAnnotations) {
    const newAnnotations = modifiedAnnotations.map((item) => {
      if (item instanceof Annotation) {
        return item;
      }

      const text = tokens
        .slice(item.start, item.end)
        .reduce(
          (acc, cur, idx) =>
            acc +
            cur.text +
            (item.start + idx + 1 < item.end && cur.hasWhitespace ? " " : ""),
          ""
        );
      return new Annotation(item.start, item.end, item.tag, text);
    });
    setAnnotations(newAnnotations);
  }

  return (
    <div className="main-view">
      <AnnotationControl
        tokens={tokens}
        annotations={annotations}
        computedAnnotations={computedAnnotations}
        onAnnotationsChange={onAnnotationsChange}
        onFileDrop={onFileDrop}
        onCancel={onCancel}
        isLoading={isLoading}
        tags={tags}
      />
      <PreviewControl
        tokens={tokens}
        anonymizations={anonymizations}
        onDownload={onDownload}
      />
      <SeparatorArrow />
    </div>
  );
};

Main.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  anonymizationConfig: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Main;
