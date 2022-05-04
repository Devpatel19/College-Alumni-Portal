import axios from "axios";
const baseService = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "content-type": "application/json",
  },
});

export default baseService;
