import axios from "axios";
import { API_URL, BACKEND_URL } from "../constants/API";
import { decode as atob, encode as btoa } from "base-64";

const _API_URL = `${API_URL}`;

class AuthService {
  login(email: string, password: string) {
    var basicAuth = "Basic " + btoa(email + ":" + password);
    return axios
      .get(BACKEND_URL + "/login", {
        headers: { Authorization: basicAuth },
      })
      .then((response: { data: { accessToken: any } }) => {
        if (response.data.accessToken) {
          // localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    // localStorage.removeItem("user");
  }

  register(email: string, password: string) {
    return axios.post(
      _API_URL + "/admin/user/",
      JSON.stringify({
        username: email,
        password: password,
        role: 0,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  getCurrentUser() {
    // const userStr = localStorage.getItem("user");
    // if (userStr) return JSON.parse(userStr);

    // return null;
  }
}

export default new AuthService();
