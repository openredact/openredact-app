import axios from "axios";
import queryString from "query-string";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {},
  paramsSerializer: queryString.stringify,
});

export default API;
