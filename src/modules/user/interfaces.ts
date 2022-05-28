import { Role } from "@prisma/client";
export interface UserI {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: Role;
}
export interface UserClass{
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    role: Role;
    password:string
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
  role:Role
}
export interface UserSelect {
  name?: boolean;
  email?: boolean;
  id: boolean;
  cuid: boolean;
}
