import RedisClient from './index'
class RedisCRUDServices{
    private readonly redisClient = RedisClient.getClient();

    async get(key: string): Promise<string>{
        return await this.redisClient.get(key);
    }

    async set(key: string, value: string): Promise<void>{
        return await this.redisClient.set(key, value);
    }

    async del(key: string): Promise<void>{
        return await this.redisClient.del(key);
    }
}