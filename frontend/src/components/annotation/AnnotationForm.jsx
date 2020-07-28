import React, { useContext, useState } from "react";
import { Button, Divider, Icon, Tag, Tooltip } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import PropTypes from "prop-types";
import { useHotkeys } from "react-hotkeys-hook";

import "./AnnotationForm.sass";
import PolyglotContext from "../../js/polyglotContext";
import constants from "../../js/constants";
import TokenAnnotator from "./annotator/TokenAnnotator";

const AnnotationForm = ({
  paragraphs,
  annotations,
  onAnnotationsChange,
  tags,
}) => {
  const [activeTag, setActiveTag] = useState(tags[0]);
  const t = useContext(PolyglotContext);
  const navButtons = false;
  const [selectedParagraph, setSelectedParagraph] = useState(-1);
  const [selectedStart, setSelectedStart] = useState(-1);
  const [selectedEnd, setSelectedEnd] = useState(-1);

  function onAnnotationRemove(paragraphIndex, mark) {
    // Remove items in annotations of current paragraph
    const paragraphAnnotations = annotations[paragraphIndex].filter(
      (item) => item.start !== mark.start || item.end !== mark.end
    );

    // Is removed annotation the selected one?
    if (
      selectedParagraph === paragraphIndex &&
      selectedStart === mark.start &&
      selectedEnd === mark.end
    ) {
      selectPreviousAnnotation(
        annotations,
        selectedParagraph,
        selectedStart,
        selectedEnd
      );
    }

    onAnnotationsChange(paragraphIndex, paragraphAnnotations);
  }

  function onAnnotationClick(paragraphIndex, mark) {
    // Select clicked annotation
    setSelectedParagraph(paragraphIndex);
    setSelectedStart(mark.start);
    setSelectedEnd(mark.end);
  }

  const selectPreviousAnnotation = (
    inputAnnotations,
    paragraph,
    start,
    end
  ) => {
    // Paragraph must be set
    if (paragraph >= 0) {
      if (inputAnnotations[paragraph].length < 1) {
        // Unset
        setSelectedParagraph(-1);
        setSelectedStart(-1);
        setSelectedEnd(-1);
      }

      // sort annotations in current paragraph descending
      inputAnnotations[paragraph].sort((a, b) => b.start - a.start);

      // select the annotation with start < selectedStart
      let newSelection;

      for (let i = 0; i < inputAnnotations[paragraph].length; i += 1) {
        if (inputAnnotations[paragraph][i].start < start) {
          newSelection = inputAnnotations[paragraph][i];
          break;
        }
      }

      if (newSelection) {
        // previous annotation found in current paragraph
        setSelectedStart(newSelection.start);
        setSelectedEnd(newSelection.end);
      } else if (paragraph > 0) {
        // Last annotations from previous paragraph
        let newParagraph = paragraph - 1;

        while (newParagraph >= 0) {
          if (inputAnnotations[newParagraph].length > 0) {
            inputAnnotations[newParagraph].sort((a, b) => b.start - a.start); // sort descending

            setSelectedParagraph(newParagraph);
            setSelectedStart(inputAnnotations[newParagraph][0].start);
            setSelectedEnd(inputAnnotations[newParagraph][0].end);
            break;
          }
          newParagraph -= 1;
        }
      }
    }

    return false;
  };

  const selectNextAnnotation = (inputAnnotations, paragraph, start, end) => {
    if (paragraph >= 0) {
      // sort annotations of current paragraph by "start"
      inputAnnotations[paragraph].sort((a, b) => a.start - b.start);

      // select the annotation with start > selectedEnd
      let newSelection;

      for (let i = 0; i < inputAnnotations[paragraph].length; i += 1) {
        if (inputAnnotations[paragraph][i].start > end) {
          newSelection = inputAnnotations[paragraph][i];
          break;
        }
      }

      if (newSelection) {
        // new selection already found
        setSelectedStart(newSelection.start);
        setSelectedEnd(newSelection.end);
      } else {
        // find in next paragraph
        let newParagraph = paragraph + 1;

        while (newParagraph < paragraphs.length) {
          // Skip empty paragraphs
          if (inputAnnotations[newParagraph].length > 0) {
            inputAnnotations[newParagraph].sort((a, b) => a.start - b.start);

            // Take first annotation of next paragraph
            setSelectedParagraph(newParagraph);
            setSelectedStart(inputAnnotations[newParagraph][0].start);
            setSelectedEnd(inputAnnotations[newParagraph][0].end);

            break;
          }
          newParagraph += 1;
        }
      }
    }
    // TODO jump to beginning?

    return false;
  };

  const selectTag = (
    tagIndex,
    tag,
    inputAnnotations,
    paragraph,
    start,
    end
  ) => {
    // Is the selected tag valid?
    if (!isNaN(tagIndex) && tagIndex > 0 && tagIndex <= tags.length) {
      const newActiveTag = tags[tagIndex - 1];

      // If old tag is equal to new tag, no need to change anything
      if (tag === newActiveTag) return;

      // Update active tag
      setActiveTag(newActiveTag);

      // Is any annotation selected that we need to change?
      if (paragraph >= 0 && start >= 0 && end >= 0) {
        const changedAnnotations = [...inputAnnotations];

        for (let i = 0; i < changedAnnotations[paragraph].length; i += 1) {
          if (
            start === changedAnnotations[paragraph][i].start &&
            end === changedAnnotations[paragraph][i].end
          ) {
            // Change tag
            changedAnnotations[paragraph][i].tag = newActiveTag;
            console.log("Change to tag: ", newActiveTag);
            break;
          }
        }
        // Send annotation change
        onAnnotationsChange(paragraph, changedAnnotations[paragraph]);
      }
    }
  };

  // Hot keys
  useHotkeys(
    "left",
    () =>
      selectPreviousAnnotation(
        annotations,
        selectedParagraph,
        selectedStart,
        selectedEnd
      ),
    {},
    [annotations, selectedParagraph, selectedStart, selectedEnd]
  );
  useHotkeys(
    "right",
    () =>
      selectNextAnnotation(
        annotations,
        selectedParagraph,
        selectedStart,
        selectedEnd
      ),
    {},
    [annotations, selectedParagraph, selectedStart, selectedEnd]
  );
  useHotkeys(
    "0,1,2,3,4,5,6,7,8,9",
    (event) =>
      selectTag(
        parseInt(event.key, 10),
        activeTag,
        annotations,
        selectedParagraph,
        selectedStart,
        selectedEnd
      ),
    {},
    [activeTag, annotations, selectedParagraph, selectedStart, selectedEnd]
  );

  return (
    <div>
      <div className="annotation-header">
        <span className="label">{t("annotation.tagsLabel")}</span>
        {tags.map((tag, index) => (
          <Tooltip
            content={t(`tags.${tag.toLowerCase()}`)}
            hoverOpenDelay={constants.tooltipHoverOpenDelay}
            key={tag}
          >
            <Button
              className={`tag tag-${String(index + 1)} ${
                tags.length >= constants.maxTagColors ? "" : "tag-colored"
              }`}
              active={activeTag === tag}
              onClick={() =>
                selectTag(
                  index + 1,
                  activeTag,
                  annotations,
                  selectedParagraph,
                  selectedStart,
                  selectedEnd
                )
              }
            >
              {tag}
              <Tag>{index + 1}</Tag>
            </Button>
          </Tooltip>
        ))}
        {navButtons && (
          <div className="annotation-navigation">
            <Tooltip
              content="Previous annotation"
              hoverOpenDelay={constants.tooltipHoverOpenDelay}
            >
              <Button
                className="tag"
                onClick={() =>
                  selectPreviousAnnotation(
                    annotations,
                    selectedParagraph,
                    selectedStart,
                    selectedEnd
                  )
                }
              >
                <Icon icon={IconNames.ARROW_LEFT} />
              </Button>
            </Tooltip>
            <Tooltip
              content="Next annotation"
              hoverOpenDelay={constants.tooltipHoverOpenDelay}
            >
              <Button
                className="tag"
                onClick={() =>
                  selectNextAnnotation(
                    annotations,
                    selectedParagraph,
                    selectedStart,
                    selectedEnd
                  )
                }
              >
                <Icon icon={IconNames.ARROW_RIGHT} />
              </Button>
            </Tooltip>
          </div>
        )}
        <Divider vertical />
      </div>

      <div className="annotation-body">
        {paragraphs.map((paragraph, paragraphIndex) => (
          <div>
            <TokenAnnotator
              tokens={paragraph.tokens}
              value={annotations[paragraphIndex]}
              onChange={(changedParagraphAnnotations) => {
                onAnnotationsChange(
                  paragraphIndex,
                  changedParagraphAnnotations
                );
              }}
              getSpan={(span) => ({
                ...span,
                tag: activeTag,
              })}
              renderMark={(mark) => (
                <Tag
                  className={`annotation-mark tag-${
                    tags.indexOf(mark.tag) + 1
                  } ${
                    paragraphIndex === selectedParagraph &&
                    mark.start === selectedStart &&
                    mark.end === selectedEnd
                      ? "annotation-mark annotation-selected"
                      : ""
                  } ${
                    tags.length >= constants.maxTagColors ? "" : "tag-colored"
                  }`}
                  key={mark.key}
                >
                  <div
                    role="button"
                    tabIndex={mark.key}
                    className="tag-content"
                    onClick={() => onAnnotationClick(paragraphIndex, mark)}
                    onKeyPress={() => onAnnotationClick(paragraphIndex, mark)}
                  >
                    {mark.text}
                    <span className="tag">{mark.tag}</span>
                  </div>
                  <span
                    role="button"
                    tabIndex={mark.key}
                    className="remove"
                    onClick={() => onAnnotationRemove(paragraphIndex, mark)}
                    onKeyPress={() => onAnnotationClick(paragraphIndex, mark)}
                  >
                    <Icon icon={IconNames.SMALL_CROSS} />
                  </span>
                </Tag>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

AnnotationForm.propTypes = {
  paragraphs: PropTypes.arrayOf(PropTypes.object).isRequired,
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAnnotationsChange: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnnotationForm;
