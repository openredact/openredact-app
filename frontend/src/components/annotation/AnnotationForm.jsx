import React, { useContext, useState } from "react";
import { Button, Icon, Tag, Tooltip } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
// import { TokenAnnotator } from "react-text-annotate";
import { GlobalHotKeys } from "react-hotkeys";
import PropTypes from "prop-types";

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

  const [selectedParagraph, setSelectedParagraph] = useState(-1);
  const [selectedStart, setSelectedStart] = useState(-1);
  const [selectedEnd, setSelectedEnd] = useState(-1);

  // const textTokens = tokens.map((token) => token.text);

  function onAnnotationRemove(paragraphIndex, mark) {
    // Remove items in annotations of current paragraph
    let paragraphAnnotations = annotations[paragraphIndex].filter(
      (item) => item.start !== mark.start || item.end !== mark.end
    );

    // Is removed annotation the selected one?
    if (
      selectedParagraph === paragraphIndex &&
      selectedStart === mark.start &&
      selectedEnd === mark.end
    ) {
      selectPreviousAnnotation();
    }

    onAnnotationsChange(paragraphIndex, paragraphAnnotations);
  }

  function onAnnotationClick(paragraphIndex, mark) {
    // Select clicked annotation
    setSelectedParagraph(paragraphIndex);
    setSelectedStart(mark.start);
    setSelectedEnd(mark.end);
  }

  const selectPreviousAnnotation = () => {
    console.log("previous ", selectedParagraph);

    if (selectedParagraph >= 0) {
      console.log("selectedPargraph: ", selectedParagraph);
      console.log(annotations[selectedParagraph]);

      if (annotations[selectedParagraph].length < 1) {
        // Unset
        setSelectedParagraph(-1);
        setSelectedStart(-1);
        setSelectedEnd(-1);
      }

      // sort annotations in current paragraph descending
      annotations[selectedParagraph].sort((a, b) => b.start - a.start);

      // select the annotation with start < selectedStart
      let newSelection;

      for (let i = 0; i < annotations[selectedParagraph].length; i++) {
        if (annotations[selectedParagraph][i].start < selectedStart) {
          newSelection = annotations[selectedParagraph][i];
          break;
        }
      }

      console.log("newSelection ", newSelection);

      if (newSelection) {
        // previous annotation found in current paragraph
        setSelectedStart(newSelection.start);
        setSelectedEnd(newSelection.end);
      } else {
        // find previous annotation in other paragraphs

        if (selectedParagraph > 0) {
          // Last annotations from previous paragraph
          let newParagraph = selectedParagraph - 1;

          while (newParagraph >= 0) {
            if (annotations[newParagraph].length > 0) {
              annotations[newParagraph].sort((a, b) => b.start - a.start); // sort descending

              let newSelection = annotations[newParagraph][0];
              setSelectedParagraph(newParagraph);
              setSelectedStart(newSelection.start);
              setSelectedEnd(newSelection.end);
              break;
            }
            newParagraph -= 1;
          }
        }
      }
    }
  };

  const selectNextAnnotation = () => {
    console.log("next ", selectedParagraph, selectedStart, selectedEnd);
    // console.log(' state , ', this.state);

    if (selectedParagraph >= 0) {
      // sort annotations of current paragraph by "start"
      annotations[selectedParagraph].sort((a, b) => a.start - b.start);

      // select the annotation with start > selectedEnd
      let newSelection;

      for (let i = 0; i < annotations[selectedParagraph].length; i++) {
        if (annotations[selectedParagraph][i].start > selectedEnd) {
          newSelection = annotations[selectedParagraph][i];
          break;
        }
      }

      if (newSelection) {
        // new selection already found
        setSelectedStart(newSelection.start);
        setSelectedEnd(newSelection.end);
      } else {
        // find in next paragraph
        let newParagraph = selectedParagraph + 1;

        while (newParagraph < paragraphs.length) {
          // Skip empty paragraphs
          if (annotations[newParagraph].length > 0) {
            annotations[newParagraph].sort((a, b) => a.start - b.start);

            // Take first annotation of next paragraph
            let newSelection = annotations[newParagraph][0];

            setSelectedParagraph(newParagraph);
            setSelectedStart(newSelection.start);
            setSelectedEnd(newSelection.end);

            break;
          }
          newParagraph += 1;
        }
      }
    }
    // TODO jump to beginning?
  };

  const hotkeyHandlers = {
    selectTag: (event) => {
      const tagIndex = parseInt(event.key, 10);

      // TODO change annotation for selection
      // (does not work without states)

      if (!Number.isNaN(tagIndex) && tagIndex > 0 && tagIndex <= tags.length)
        setActiveTag(tags[tagIndex - 1]);
    },
    next: () => {
      // TODO Hot keys do not receive states
      //selectNextAnnotation();
    },
    previous: () => {
      // TODO Hot keys do not receive states
      //selectPreviousAnnotation();
    },
  };

  const hotkeys = {
    selectTag: [...Array(tags.length).keys()].map((key) => String(key + 1)),
    next: "right",
    previous: "left",
  };

  function debug() {
    console.log(selectedParagraph);
    console.log(selectedStart);
    console.log(selectedEnd);

    console.log("Paragraphs: ", paragraphs);
    console.log("Annotations: ", annotations);
  }

  return (
    <div>
      <button onClick={() => debug()}>Debug</button>
      <input key={1} value={selectedParagraph} />
      <input key={2} value={selectedStart} />
      <input key={3} value={selectedEnd} />
      <hr />
      <GlobalHotKeys keyMap={hotkeys} handlers={hotkeyHandlers} />

      <div className="annotation-header">
        {tags.map((tag, index) => (
          <Tooltip
            content={t(`tags.${tag.toLowerCase()}`)}
            hoverOpenDelay={constants.tooltipHoverOpenDelay}
            key={tag}
          >
            <Button
              className="tag"
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
              <Tag>{index + 1}</Tag>
            </Button>
          </Tooltip>
        ))}
        <div className="annotation-navigation">
          <Tooltip
            content="Previous annotation"
            hoverOpenDelay={constants.tooltipHoverOpenDelay}
          >
            <Button className="tag" onClick={() => selectPreviousAnnotation()}>
              <Icon icon={IconNames.ARROW_LEFT} />
            </Button>
          </Tooltip>
          <Tooltip
            content="Next annotation"
            hoverOpenDelay={constants.tooltipHoverOpenDelay}
          >
            <Button className="tag" onClick={() => selectNextAnnotation()}>
              <Icon icon={IconNames.ARROW_RIGHT} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="annotation-body">
        {paragraphs.map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex} {...paragraph.htmlProps}>
            <pre>{JSON.stringify(annotations[paragraphIndex])}</pre>
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
                  className={
                    paragraphIndex === selectedParagraph &&
                    mark.start === selectedStart &&
                    mark.end === selectedEnd
                      ? "annotation-mark annotation-selected"
                      : "annotation-mark"
                  }
                  key={mark.key}
                >
                  <div
                    className="tag-content"
                    onClick={() => onAnnotationClick(paragraphIndex, mark)}
                  >
                    {mark.text}
                    <span className="tag">{mark.tag}</span>
                  </div>
                  <span
                    className="remove"
                    onClick={() => onAnnotationRemove(paragraphIndex, mark)}
                  >
                    <Icon icon={IconNames.SMALL_CROSS} />
                  </span>
                </Tag>
              )}
            />
          </p>
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
