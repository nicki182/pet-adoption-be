//TODO: CREATE SERVICES FOR SESSION MANAGMENT
import RedisCRUDServices from "@redis/services";
import Session from "./class";
import { SessionI } from "./interfaces";
class SessionServices extends RedisCRUDServices {
  public async createSession(sessionData: SessionI): Promise<Session> {
    const userId = String(sessionData.userId);
    await this.set(String(sessionData.userId), JSON.stringify(sessionData));
    const session = new Session(sessionData);
    await this.setToExpire(
      userId,
      JSON.stringify(session),
      session.gerExpirationTime()
    );
    return session;
  }
  public async getSession(userId: string): Promise<Session> {
    const session: string = await this.get(userId);
    return new Session(JSON.parse(session));
  }
  public async deleteSession(userId: string): Promise<void> {
    await this.del(userId);
  }
    public async updateSession(session: SessionI): Promise<Session> {
    await this.set(String(session.userId), JSON.stringify(session));
    return new Session(session);
    }
}
export default new SessionServices();
