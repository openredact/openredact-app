import axios from "axios";
import queryString from "query-string";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {},
  paramsSerializer: queryString.stringify,
});

export default {
  nlp: {
    findPiis(formData) {
      return API.post("nlp/find-piis/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    computeScores(payload) {
      return API.post("nlp/score/", payload);
    },
    fetchTags() {
      return API.get("nlp/tags/");
    },
  },
  anonymizer: {
    anonymizeFile(formData) {
      return API.post("file/anonymize/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });
    },
  },
};
