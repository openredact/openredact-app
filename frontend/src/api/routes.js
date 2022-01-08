import axios from "axios";
import queryString from "query-string";
import AppToaster from "../js/toaster";
import { polyglot } from "../translations/utils";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api",
  headers: {},
  paramsSerializer: queryString.stringify,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network Error") {
      AppToaster.show({
        message: polyglot.t("app.network_error_toast"),
        intent: "danger",
        icon: "warning-sign",
      });
    }

    throw error;
  }
);

function findPiis(formData) {
  return API.post("find-piis", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function computeScores(payload) {
  return API.post("score", payload);
}

function fetchTags() {
  return API.get("tags");
}

function compileFile(formData) {
  return API.post("anonymize-file?return_base64=1", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function anonymizeFile(formData) {
  return API.post("anonymize-file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "blob",
  });
}

function anonymizePiis(payload) {
  return API.post("anonymize", payload);
}

function fetchRecognizers() {
  return API.get("recognizers");
}

export {
  findPiis,
  computeScores,
  fetchTags,
  anonymizeFile,
  anonymizePiis,
  compileFile,
  fetchRecognizers,
};
