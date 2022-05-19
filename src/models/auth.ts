export interface RegisterUser {
  fullName: string;
  email: string;
  password: string;
  age: number;
}

export interface LoginUser {
  email: string;
  password: string;
}
