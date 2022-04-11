import jwt from "jsonwebtoken";
import { SessionI } from "./interfaces";
class Session {
  private accessToken: string;
  private refreshToken: string;
  private userId: string;
  private readonly expiration = Number(process.env.EXPIRATION_TIME);
  constructor(sessionData: SessionI) {
    const { accessToken, refreshToken, userId } = sessionData;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = userId;
  }
  public getExpirationTime(): number {
    return this.expiration;
  }
  public getUserId() {
    return this.userId;
  }
  public getAccessToken(): string {
    return this.accessToken;
  }
  public getRefreshToken(): string {
    return this.refreshToken;
  }
}
export default Session;
