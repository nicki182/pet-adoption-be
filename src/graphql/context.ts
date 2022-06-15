import PrismaClient from "@prismaAPI/index";
import { verifyToken } from "@utils/authentication";
import ServerError from "@error/ServerError";
const context = async ({ req }) => {
  const prisma = PrismaClient.getPrismaClient();
  //TODO:Fix to make playground of graphql work with cookies but if you want to test playground 
  //comment the line below until line 17 and uncomment line 18
  const session = verifyToken(req.cookies.token);
  if (session) {
    req.cookies.token &&
      (req.headers.authorization = `Bearer ${req.cookies.token}`);
    //Authentication Error Handling
    return {
      prisma,
      session,
    };
  } else throw new ServerError(401, { message: "Unauthorized", status: 401 });
  return { prisma };
};
export default context;
