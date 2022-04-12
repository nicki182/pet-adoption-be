//TODO: CREATE SERVICES FOR SESSION MANAGMENT
import RedisCRUDServices from "@redis/services";
import Session from "./class";
import { SessionI } from "./interfaces";
import { generateToken } from "@utils/authentication";
import CustomError from "../error/index";
class SessionServices extends RedisCRUDServices {
  public async createSession(userId: string): Promise<Session> {
    const accessToken = await this.createAccessToken(userId);
    const refreshToken = await this.createRefreshToken(userId);
    const sessionData: SessionI = {
      accessToken,
      refreshToken,
      userId,
    };
    const session = new Session(sessionData);
    try {
      await this.setToExpire(
        userId,
        JSON.stringify(session),
        Number(process.env.EXPIRATION_TIME)
      );
    } catch (e) {
      throw new CustomError(String(e));
    }
    return session;
  }
  public async createAccessToken(userId: string): Promise<string> {
    return generateToken(userId, Number(process.env.EXPIRATION_TIME));
  }
  public async createRefreshToken(userId: string): Promise<string> {
    return generateToken(userId, "1year");
  }
  public async getSession(userId: string): Promise<Session> {
    const session: string = await this.get(userId);
    if (!session) throw new CustomError("Session not found");
    return new Session(JSON.parse(session));
  }
  public async deleteSession(userId: string): Promise<void> {
    await this.del(userId);
  }
  public async updateSession(session: SessionI): Promise<Session> {
    await this.set(String(session.userId), JSON.stringify(session));
    return new Session(session);
  }
  public async refreshAccessToken(session: SessionI): Promise<Session> {
    await this.set(String(session.userId), JSON.stringify(session));
    return new Session(session);
  }
}
export default new SessionServices();
