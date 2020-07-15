/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@blueprintjs/core";
import "./Dropzone.sass";
import PropTypes from "prop-types";
import PolyglotContext from "../../js/polyglotContext";

const ACCEPTED_FORMATS = [".txt", ".pdf", ".html", ".docx"];

const Dropzone = ({ onFileDrop }) => {
  const t = useContext(PolyglotContext);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: ACCEPTED_FORMATS.join(","),
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDropAccepted: onFileDrop,
  });

  function computeFormatString() {
    // prettier-ignore
    return `${ACCEPTED_FORMATS.slice(0, -1).join(", ")}, ${t("annotation.or")} ${ACCEPTED_FORMATS.slice(-1)}`;
  }

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <p>{t("annotation.drop", { formats: computeFormatString() })}</p>
      <Button type="button" onClick={open}>
        {t("annotation.browse")}
      </Button>
    </div>
  );
};

Dropzone.propTypes = {
  onFileDrop: PropTypes.func.isRequired,
};

export default Dropzone;
