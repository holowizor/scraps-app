import axios from "axios";

// const API_URL = "http://localhost:9090";
const API_URL = "";

// const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

const login = (name, password) => {
  return axios
    .post(API_URL + "/api/jwt/authenticate", { name, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  // FIXME also send token ping?
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  // register,
  login,
  logout,
  getCurrentUser,
};