export interface IUser {
  username: string;
  displayName: string
  password: string;
  token: string;
  role: string;
  avatar: string | null;
  googleId?: string;
}