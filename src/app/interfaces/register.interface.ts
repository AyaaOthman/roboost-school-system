export interface UserForm {
    name: string;
    userName: string;
    password: string;
  }
  export interface RegisterResponse {
    message: string;
    user: UserForm;
  }