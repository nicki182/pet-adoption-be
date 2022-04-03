import { Client } from 'redis-om';
class RedisClient{
    //TODO: Check client type of redis-om
    private client:any
    getClient(){
        return this.client
    }
    public async start():Promise<void>{
        try{
       this.client = await new Client().open(process.env.REDIS_PORT)
        }
        catch(e){
            throw new Error(e as string)
        }
    }
}
export default new RedisClient()