//TODO: CREATE CONTROLLER FOR SESSION MANAGMENT
import SessionServices from "./services";
import { SessionI } from "./interfaces";
import UserServices from "@user/services";
import User from "@user/class";
import Session from "./class";
import { UserI, UserModelI } from "@user/interfaces";
import CustomError from "../error/index";
interface DataRequest {
  email: string;
  password: string;
}
class ControllerSession {
  async logInSession(data: DataRequest): Promise<Session> {
    try {
      const user: UserModelI = await UserServices.getByField(
        "email",
        data.email
      );
      if (!user) throw new CustomError("User not found");
      if (!UserServices.validatePassword(data.password, user.password))
        throw new Error("Password is incorrect");
      return SessionServices.createSession(user.cuid);
    } catch (error) {
      throw new CustomError(String(error));
    }
  }
  async signUpSession(userData: UserI) {
    try {
      const user: User = await UserServices.create(userData);
      return SessionServices.createSession(user.getId());
    } catch (e) {
      throw new CustomError(String(e));
    }
  }
  /*
    async refreshAccessToken(session) {
        await this.session.set(String(session.userId), JSON.stringify(session));
        return new Session(session);
    }
    async logOutSession(session) {
        await this.session.set(String(session.userId), JSON.stringify(session));
        return new Session(session);
    }*/
}
export default new ControllerSession();
