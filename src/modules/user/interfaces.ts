export interface UserI {
  id: string;
  name: string;
  email: string;
}
export interface UserModelI {
  id: number;
  name: string;
  email: string;
  password: string;
  cuid: string;
}
export interface UserSelect {
  name?: string;
  email?: string;
  id: number;
}
