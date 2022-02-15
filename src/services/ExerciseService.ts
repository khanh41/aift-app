import axios from "axios";
import { apiUrl } from "../constants/API";
import { IExercise, IResponseAPI } from "../types/ResponseType";

const API_URL = `${apiUrl}/admin/exercise`;

export interface IExerciseResponse extends IResponseAPI {
  data: IExercise[];
}

export class ExerciseService {
  getAll() {
    return axios.get<IExerciseResponse>(API_URL);
  }

  get(id: string) {
    return axios.get<IExerciseResponse>(`/tutorials/${id}`);
  }

  create(data: IExercise) {
    return axios.post<IExercise>("/tutorials", data);
  }

  update(data: IExercise, id: any) {
    return axios.put<any>(`/tutorials/${id}`, data);
  }

  delete(id: any) {
    return axios.delete<any>(`/tutorials/${id}`);
  }

  predictForm(exerciseCode: string, exerciseName: string, image_file: any) {
    const photo = {
      uri: image_file,
      type: "image/jpeg",
      name: "photo.jpg",
    };
    const formData = new FormData();
    formData.append("file", photo);

    return axios.post<IResponseAPI>(
      `${API_URL}/predict-form?exercise_code=${exerciseCode}&exercise_name=${exerciseName}`,
      formData
    );
  }

  predictVideo(exerciseName: string, file: any) {
    const video = {
      uri: file,
      type: "video/mp4",
      name: "video.mp4",
    };
    const formData = new FormData();
    formData.append("file", video);

    return axios.post<IResponseAPI>(
      `${API_URL}/predict-video?exercise_name=${exerciseName}`,
      formData
    );
  }

  findByTitle(title: string) {
    return axios.get<Array<IExercise>>(`/tutorials?title=${title}`);
  }
}

export default new ExerciseService();
