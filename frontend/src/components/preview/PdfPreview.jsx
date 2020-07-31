import React, { useState } from "react";
import { Spinner } from "@blueprintjs/core";
import PropTypes from "prop-types";
import "./PdfPreview.sass";
import { Document, Page, pdfjs } from "react-pdf";
import constants from "../../js/constants";

// Set PDF worker (see https://github.com/wojtekmaj/react-pdf#enable-pdfjs-worker)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfPreview = ({ base64pdf }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess(event) {
    setNumPages(event.numPages);
  }

  return (
    <Document
      file={`data:application/pdf;base64,${base64pdf}`}
      onLoadSuccess={onDocumentLoadSuccess}
      options={{
        // load cMap from CDN
        cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
        cMapPacked: true,
      }}
      onLoadError={(error) => alert(error.message)}
      onSourceError={(error) => alert(error.message)}
      loading={<Spinner />}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          width={constants.previewPdfWidth}
        />
      ))}
    </Document>
  );
};

PdfPreview.propTypes = {
  base64pdf: PropTypes.string.isRequired,
};

export default PdfPreview;
