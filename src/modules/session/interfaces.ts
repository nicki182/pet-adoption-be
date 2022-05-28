import { Role } from "@prisma/client";
export interface SessionI {
  accessToken: string;
  refreshToken: string;
  userId: string;
  role:Role
}
export interface DataRequest {
  email: string;
  password: string;
}
