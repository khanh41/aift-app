import axios from "axios";
import authHeader from "../constants/AuthHeader";

const API_URL = "http://localhost:8080/api/test/";

// let  = {
//   headers: authHeader(),
// };

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user");
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod");
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin");
  }
}

export default new UserService();
