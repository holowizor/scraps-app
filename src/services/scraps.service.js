import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://localhost:9091/api/";
const API_URL = "/api/";

const getScraps = () => {
  return axios.get(API_URL + "scraps", { headers: authHeader() });
};

const createScrap = (name) => {
  return axios.post(API_URL + "scraps", { name }, { headers: authHeader() });
};

const getScrap = (id) => {
  return axios.get(API_URL + "scraps/" + id, { headers: authHeader() });
};

const updateScrap = (id, name, content) => {
  return axios.post(API_URL + "scraps/" + id, { name, content }, { headers: authHeader() });
};

const deleteScrap = (id) => {
  return axios.delete(API_URL + "scraps/" + id, { headers: authHeader() });
};

export default {
  getScraps,
  createScrap,
  getScrap,
  updateScrap,
  deleteScrap
};