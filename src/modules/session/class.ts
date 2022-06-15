import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { SessionI } from "./interfaces";
class Session {
  private accessToken: string;
  private refreshToken: string;
  private userId: string;
  private role: Role;
  constructor(sessionData: SessionI) {
    const { accessToken, refreshToken, userId } = sessionData;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = userId;
    this.role = sessionData.role;
  }
  public getUserId() {
    return this.userId;
  }
  public getRole(): Role {
    return this.role;
  }
  public getAccessToken(): string {
    return this.accessToken;
  }
  public getRefreshToken(): string {
    return this.refreshToken;
  }
}
export default Session;
