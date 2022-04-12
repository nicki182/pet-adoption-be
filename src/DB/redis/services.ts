import { GenericCrudServicesI } from "../../interfaces";
import RedisClient from "./index";
class RedisCRUDServices {
  private redisClient = RedisClient.getClient();

  public async get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  public async setClient() {
  this.redisClient = RedisClient.getClient();
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
  async setToExpire(key: string, value: string, expire: number): Promise<void> {
    await this.setClient()
    await this.redisClient.setEx(key, expire, value);
  }
  async deleteAll(): Promise<void> {
    await this.redisClient.flushDb();
  }
}
export default RedisCRUDServices;
