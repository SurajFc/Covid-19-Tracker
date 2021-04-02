import axios from "axios";

const API_URL = "https://api.covid19api.com/";

const API = axios.create({
  baseURL: API_URL,
  timeout: 50000,
});

export default API;
