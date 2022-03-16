import axios from "axios";
import { API_URL } from "../constants/API";
import { IExercise, IResponseAPI } from "../types/ResponseType";

const _API_URL = `${API_URL}/admin/user/me`;

class UserService {
  getHistoryImage() {
    return axios.get<IResponseAPI>(_API_URL + "/image-history");
  }

  addHistoryImage(image_name: string) {
    return axios.post<IResponseAPI>(_API_URL + "/image-history/" + image_name);
  }
}

export default new UserService();
