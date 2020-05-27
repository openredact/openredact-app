import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Scores.sass";
import { Dialog, Pre } from "@blueprintjs/core";

const Scores = ({ scores }) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div>
      <Dialog
        onClose={() => setShowDialog(false)}
        isOpen={showDialog}
        title="Scores"
        canOutsideClickClose
        canEscapeKeyClose
        isCloseButtonShown
      >
        <Pre className="score-dialog">{JSON.stringify(scores, null, 2)}</Pre>
      </Dialog>
      <div
        role="button"
        tabIndex="0"
        className="score-footer"
        onClick={() => setShowDialog(true)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) setShowDialog(true);
        }}
      >
        F2 Score: {scores.total.f2.toFixed(2)}
      </div>
    </div>
  );
};

Scores.propTypes = {
  scores: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Scores;
