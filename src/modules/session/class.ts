import jwt from 'jsonwebtoken';
class Sesssion {
    private access_token:string
    private refresh_token:string
    private userId:number
    private readonly  secret:string = process.env.JWT_KEY as string
    constructor(sessionData:SessionI){
        this.access_token= sessionData.access_token
        this.refresh_token = sessionData.refresh_token
        this.userId = sessionData.userId
    }
    getAccessToken():string{
        return this.access_token
    }
    getRefreshToken():string{
       return this.refresh_token
    }
    getUserId(){
        return this.userId
    }
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
export default Sesssion;