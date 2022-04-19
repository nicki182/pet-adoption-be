export interface UserI {
  id: string;
  name: string;
  email: string;
}
export interface UserCreate {
  name: string;
  email: string;
  password: string;
}
export interface UserModelI {
  id: number;
  name: string;
  email: string;
  password: string;
  cuid: string;
}
export interface UserSelect {
  name?: boolean;
  email?: boolean;
  id: boolean;
  cuid: boolean;
}
