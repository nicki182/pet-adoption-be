import {createClient} from "redis"
class RedisClient {
  //TODO: Check client type of redis-om
  private client: any;
  getClient() {
    return this.client;
  }
  public async start(): Promise<void> {
    try {
        const client = createClient({ url:process.env.REDIS_PORT })
        await client.connect()
      this.client = client;
      
    } catch (e) {
      throw new Error(e as string);
    }
  }
}
export default new RedisClient();
