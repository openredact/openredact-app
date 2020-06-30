import React from "react";
import { NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import PropTypes from "prop-types";
import PolyglotContext from "../js/polyglotContext";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    const t = this.context;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <NonIdealState
          icon={IconNames.WARNING_SIGN}
          title={t("app.rendering_error")}
          action={t("app.rendering_error_action")}
        />
      );
    }

    return children;
  }
}

ErrorBoundary.contextType = PolyglotContext;

ErrorBoundary.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ErrorBoundary;
