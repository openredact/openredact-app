/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@blueprintjs/core";
import "./Dropzone.sass";

const Dropzone = () => {
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <p>Drag &apos;n&apos; drop some files here</p>
      <Button type="button" onClick={open}>
        Browse your computer
      </Button>
    </div>
  );
};

export default Dropzone;
