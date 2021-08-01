import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://localhost:9090/api/";
const API_URL = "/api/";

const pingToken = () => {
  return axios.get(API_URL + "jwt/ping", { headers: authHeader() });
};

const getUser = (userId) => {
  return axios.get(API_URL + "user/byId/" + userId, { headers: authHeader() });
};

export default {
  pingToken,
  getUser,
};