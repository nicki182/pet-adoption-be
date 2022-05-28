//TODO: CREATE CONTROLLER FOR SESSION MANAGMENT
import CustomError from "@error/index";
import User from "@user/class";
import { UserCreate, UserModelI } from "@user/interfaces";
import UserServices from "@user/services";
import { verifyToken } from "@utils/authentication";
import logger from "@utils/logger";
import Session from "./class";
import { DataRequest } from "./interfaces";
import SessionServices from "./services";
class ControllerSession {
  async logInSession(data: DataRequest): Promise<Session> {
    try {
      const user: User = await UserServices.getUserByEmail(
        data.email
      );
      if (!user) throw new CustomError("User not found");
      if (!UserServices.validatePassword(data.password, user.getPassword()))
        throw new CustomError("Password is incorrect");
      logger.info(`User ${user.getId()} logged in`);
      return SessionServices.createSession(user.getId(),user.getRole());
    } catch (error) {
      throw new CustomError(String(error));
    }
  }
  async signUpSession(userData: UserCreate) {
    try {
      const user: User = await UserServices.createUser(userData, {
        cuid: true,
        email: true,
        name: true,
      });
      if (!user) throw new CustomError("User not created");
      return SessionServices.createSession(user.getId(),user.getRole());
    } catch (e) {
      throw new CustomError(String(e));
    }
  }

  async refreshAccessToken(userId: string, refreshToken: string) {
    try {
      const session: Session = await SessionServices.getSession(userId);
      if (!session) throw new CustomError("Session not found");
      if (session.getRefreshToken() !== refreshToken)
        throw new CustomError("Invalid refresh token");
      if (verifyToken(refreshToken) && verifyToken(session.getRefreshToken()))
        return await SessionServices.refreshAccessToken({
          userId: session.getUserId(),
          refreshToken: session.getRefreshToken(),
          accessToken: session.getAccessToken(),
          role: session.getRole()
        });
      else throw new CustomError("Invalid refresh token");
    } catch (e) {
      throw new CustomError(String(e));
    }
  }
  async logOutSession(userId: string) {
    SessionServices.deleteSession(userId);
  }
}
export default new ControllerSession();
