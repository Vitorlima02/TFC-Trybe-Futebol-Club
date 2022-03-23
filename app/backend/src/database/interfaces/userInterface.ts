export interface IUser {
  email: string;
  password: string;
}

export interface UserId extends IUser {
  id: number;
  username: string;
  role: string;
}
