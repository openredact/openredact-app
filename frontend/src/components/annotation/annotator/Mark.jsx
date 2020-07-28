import React from "react";
import PropTypes from "prop-types";

const Mark = ({ start, end, content, tag, color, onClick }) => {
  return (
    <span
      role="button"
      style={{ backgroundColor: color, padding: "0 4px" }}
      data-start={start}
      data-end={end}
      onClick={() => onClick({ start, end })}
      onKeyPress={() => onClick({ start, end })}
      tabIndex={start}
    >
      {content}
      {tag && (
        <span style={{ fontSize: "0.7em", fontWeight: 500, marginLeft: 6 }}>
          {tag}
        </span>
      )}
    </span>
  );
};

Mark.defaultProps = {
  color: "#84d2ff",
};

Mark.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Mark;
