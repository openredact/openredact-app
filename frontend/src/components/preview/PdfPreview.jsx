import React, { useLayoutEffect, useState } from "react";
import { Card, Spinner, Elevation } from "@blueprintjs/core";
import PropTypes from "prop-types";
import "./PdfPreview.sass";
import { Document, Page, pdfjs } from "react-pdf";
import constants from "../../js/constants";

// Set PDF worker (see https://github.com/wojtekmaj/react-pdf#enable-pdfjs-worker)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function useWindowWidth() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return width;
}

const PdfPreview = ({ base64pdf }) => {
  const [numPages, setNumPages] = useState(0);

  const windowWidth = useWindowWidth();

  function onDocumentLoadSuccess(event) {
    console.log("Number of pages: ", event.numPages);
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
        <Card
          key={`page_${index + 1}`}
          elevation={Elevation.TWO}
          className="pdf-outline"
        >
          <Page
            pageNumber={index + 1}
            width={
              constants.previewPdfWidth > 0
                ? constants.previewPdfWidth
                : Math.floor(windowWidth * 0.4) - 50
            }
          />
        </Card>
      ))}
    </Document>
  );
};

PdfPreview.propTypes = {
  base64pdf: PropTypes.string.isRequired,
};

export default PdfPreview;
