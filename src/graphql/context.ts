import PrismaClient from "@prismaAPI/index";
import {verifyToken} from "@utils/authentication";
import  ServerError  from '@error/ServerError';
const context = async ({ req }) => {
  const prisma = PrismaClient.getPrismaClient();
  const session = verifyToken(req.cookies.token);
  if(session){
  req.cookies.token && (req.headers.authorization = `Bearer ${req.cookies.accessToken}`);
  console.log('aca estoy',session)
  //Authentication Error Handling
  return {
    prisma,
    session,
  };
}else throw new ServerError(401,{message:"Unauthorized",status:401})
};
export default context;
