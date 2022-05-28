//TODO: CREATE SERVICES FOR SESSION MANAGMENT
import RedisCRUDServices from "@redis/services";
import Session from "./class";
import { SessionI } from "./interfaces";
import { generateToken } from "@utils/authentication";
import CustomError from "../error/index";
import logger from "@utils/logger";
import ms from "ms";
import { Role } from "@prisma/client";
class SessionServices{
  private redisClient = RedisCRUDServices
  public async createSession(userId: string,role:Role): Promise<Session> {
    const accessToken = await this.createAccessToken(userId);
    const refreshToken = await this.createRefreshToken(userId);
    const sessionData: SessionI = {
      accessToken,
      refreshToken,
      userId,
      role
    };
    const session = new Session(sessionData);
    try {
      await this.redisClient.setToExpire(
        userId,
        JSON.stringify(session),
        ms(process.env.EXPIRATION_TIME)
      );
    } catch (e) {
      throw new CustomError(String(e));
    }
    logger.info(`Session created for user ${userId}`);
    //console.log(session)
    return session;
  }
  public async createAccessToken(userId: string): Promise<string> {
    return generateToken(userId, String(process.env.EXPIRATION_TIME));
  }
  public async createRefreshToken(userId: string): Promise<string> {
    return generateToken(userId, "1year");
  }
  public async getSession(userId: string): Promise<Session> {
    const session: string = await this.redisClient.get(userId);
    if (!session) throw new CustomError("Session not found");
    return new Session(JSON.parse(session));
  }
  public async deleteSession(userId: string): Promise<void> {
    try {
      await this.redisClient.del(userId);
      logger.info(`Session deleted for user ${userId}`);
    } catch (e) {
      throw new CustomError(String(e));
    }
  }
  public async updateSession(session: SessionI): Promise<Session> {
    await this.redisClient.set(String(session.userId), JSON.stringify(session));
    logger.info(`Session updated for user ${session.userId}`);
    return new Session(session);
  }
  public async refreshAccessToken(session: SessionI): Promise<Session> {
    const accessToken = await this.createAccessToken(session.userId);
    await this.redisClient.set(
      String(session.userId),
      JSON.stringify({ ...session, accessToken })
    );
    logger.info(
      `Session access token has been refreshed for user ${session.userId}`
    );
    return new Session(session);
  }
}
export default new SessionServices();
