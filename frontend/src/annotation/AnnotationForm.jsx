import React, { useState } from "react";
import { Button, Icon, Tag } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { TokenAnnotator } from "react-text-annotate";
import { GlobalHotKeys } from "react-hotkeys";
import PropTypes from "prop-types";

import "./AnnotationForm.sass";

const AnnotationForm = ({ tokens, annotations, onAnnotationsChange, tags }) => {
  const [activeTag, setActiveTag] = useState(tags[0]);

  const textTokens = tokens.map((token) => token.text);

  const onAnnotationRemove = (tagProps) => {
    const newAnnotations = annotations.filter(
      (item) => item.start !== tagProps.start || item.end !== tagProps.end
    );
    onAnnotationsChange(newAnnotations);
  };

  const hotkeyHandlers = {
    selectTag: (event) => {
      const tagIndex = parseInt(event.key, 10);

      if (!Number.isNaN(tagIndex) && tagIndex > 0 && tagIndex <= tags.length)
        setActiveTag(tags[tagIndex - 1]);
    },
  };

  const hotkeys = {
    selectTag: [...Array(tags.length).keys()].map((key) => String(key + 1)),
  };

  return (
    <div>
      <GlobalHotKeys keyMap={hotkeys} handlers={hotkeyHandlers} />

      <div className="annotation-header">
        {tags.map((tag, index) => (
          <Button
            className="tag"
            key={tag}
            active={activeTag === tag}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
            <Tag>{index + 1}</Tag>
          </Button>
        ))}
      </div>

      <div className="annotation-body">
        <TokenAnnotator
          tokens={textTokens}
          value={annotations}
          onChange={onAnnotationsChange}
          getSpan={(span) => ({
            ...span,
            tag: activeTag,
          })}
          renderMark={(markProps) => (
            <Tag
              className="annotation-mark"
              onClick={() => onAnnotationRemove(markProps)}
              key={markProps.key}
            >
              {markProps.content}
              <span className="tag">{markProps.tag}</span>
              <span className="remove">
                <Icon icon={IconNames.SMALL_CROSS} />
              </span>
            </Tag>
          )}
        />
      </div>
    </div>
  );
};

AnnotationForm.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAnnotationsChange: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnnotationForm;
