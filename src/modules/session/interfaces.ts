export interface SessionI {
  accessToken: string;
  refreshToken: string;
  userId: string;
}
export interface DataRequest {
  email: string;
  password: string;
}