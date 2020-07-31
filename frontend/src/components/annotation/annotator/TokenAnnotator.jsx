import React from "react";

import PropTypes from "prop-types";

import {
  selectionIsEmpty,
  selectionIsBackwards,
  splitTokensWithOffsets,
} from "./utils";

const WrapperToken = ({ text, index, hasWhitespace, hasLinebreak }) => {
  // return <span data-i={props.i}>{props.content} </span>
  return (
    <span data-i={index}>
      {text}
      {hasWhitespace ? " " : ""}
      {hasLinebreak ? <br /> : ""}
    </span>
  );
};

WrapperToken.defaultProps = {
  hasWhitespace: true,
  hasLinebreak: false,
};

WrapperToken.propTypes = {
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  hasWhitespace: PropTypes.bool,
  hasLinebreak: PropTypes.bool,
};

// const TokenAnnotator = <T extends Span>(props: TokenAnnotatorProps<T>) => {
const TokenAnnotator = ({ renderMark, getSpan, onChange, tokens, value }) => {
  // const renderMark = props.renderMark || ((props) => <Mark {...props} />);

  // const getSpan = (span) => {
  //   if (props.getSpan) return props.getSpan(span);
  //
  //   return { start: span.start, end: span.end };
  // };

  const handleMouseUp = () => {
    if (!onChange) return;

    const selection = window.getSelection();

    if (selectionIsEmpty(selection)) return;

    if (
      !selection.anchorNode.parentElement.hasAttribute("data-i") ||
      !selection.focusNode.parentElement.hasAttribute("data-i")
    ) {
      window.getSelection().empty();
      return;
    }

    let start = parseInt(
      selection.anchorNode.parentElement.getAttribute("data-i"),
      10
    );
    let end = parseInt(
      selection.focusNode.parentElement.getAttribute("data-i"),
      10
    );

    if (selectionIsBackwards(selection)) {
      [start, end] = [end, start];
    }

    end += 1;

    onChange([
      ...value,
      getSpan({ start, end, tokens: tokens.slice(start, end) }),
    ]);
    window.getSelection().empty();
  };

  const handleSplitClick = ({ start, end }) => {
    // Find and remove the matching split.
    const splitIndex = value.findIndex(
      (s) => s.start === start && s.end === end
    );

    if (splitIndex >= 0) {
      onChange([...value.slice(0, splitIndex), ...value.slice(splitIndex + 1)]);
    }
  };

  // const { tokens, value, onChange, getSpan: _, ...divProps } = props;

  const splits = splitTokensWithOffsets(tokens, value);

  return (
    <div role="button" tabIndex={0} onMouseUp={handleMouseUp}>
      {splits.map((split, idx) => {
        const {
          mark,
          start,
          end,
          i,
          text,
          hasWhitespace,
          hasLinebreak,
        } = split;
        return mark ? (
          renderMark({
            key: `${start}-${end}`,
            ...split,
            onClick: handleSplitClick,
          })
        ) : (
          <WrapperToken
            index={i}
            text={text}
            hasWhitespace={hasWhitespace}
            hasLinebreak={hasLinebreak}
          />
        );
        // return split.mark ? (
        //   renderMark({
        //     key: `${split.start}-${split.end}`,
        //     ...split,
        //     onClick: handleSplitClick,
        //   })
        // ) : (
        //   <WrapperToken key={split.i} {...split} />
        // )
      })}
    </div>
  );
};

TokenAnnotator.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  getSpan: PropTypes.func.isRequired,
  renderMark: PropTypes.func.isRequired,
};

export default TokenAnnotator;
