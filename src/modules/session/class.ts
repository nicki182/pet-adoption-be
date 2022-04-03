import jwt from 'jsonwebtoken';
import { Entity, Schema } from 'redis-om'
import  RedisClient  from '../../redis';
class Sesssion extends Entity{
  /*async verifyToken(token:string):boolean{
        return jwt.verify(token, this.secret);
    }
    isAccessTokenVerified():boolean{
        return this.verifyToken(this.getAccessToken());
    }
    isRefreshTokenVerified():boolean{
        return this.verifyToken(this.getRefreshToken());
    }
    isEqualToken(token1:string,token2:string):boolean{
        //TODO: CHECK AFTER IF THIS IS HOW YOU COMPARE TOKENS
        return token1 === token2
    }
    isEqualToAccesToken(token:string):boolean{
        return this.isEqualToken(this.access_token,token)
    }
    isEquelToRefreshToken(token:string):boolean{
        return this.isEqualToken(this.refresh_token,token)
    }*/
}
const schema = new Schema(Sesssion,{
    access_token:{type:'string'},
    refresh_token:{type:'string'},
    userId:{type:'string'}    
})
export const sessionRepository = RedisClient.getClient().fetchRepository(schema)
export default Sesssion;
