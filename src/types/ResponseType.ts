export default interface UserType {
  id?: any | null;
  username?: string | null;
  email?: string;
  password?: string;
  roles?: Array<string>;
}

export interface IExercise {
  id: string;
  level: number;
  name: string;
  description: string;
  numStep: number;
  rating: number;
  createAt: string | undefined;
  updateAt: string | undefined;
}

export interface IResponseAPI {
  status: string;
  status_code: number;
  message: string;
  data: any;
}
