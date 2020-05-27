/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@blueprintjs/core";
import "./Dropzone.sass";
import PropTypes from "prop-types";

const Dropzone = ({ onFileDrop }) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: ".txt, .pdf, .html",
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDropAccepted: onFileDrop,
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <p>Drop a .txt, .html, or .pdf document here.</p>
      <Button type="button" onClick={open}>
        Browse your computer
      </Button>
    </div>
  );
};

Dropzone.propTypes = {
  onFileDrop: PropTypes.func.isRequired,
};

export default Dropzone;
