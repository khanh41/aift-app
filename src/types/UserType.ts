export default interface UserType {
  id?: any | null;
  username?: string | null;
  email?: string;
  password?: string;
  roles?: Array<string>;
}
