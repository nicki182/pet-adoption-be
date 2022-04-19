import  PrismaClient  from "@prismaAPI/index";
const context = async ({ req }) => {
    const prisma = PrismaClient.getPrismaClient();
    const userId = req.session.userId;
    //Authentication Error Handling
    return {
        prisma,
        userId,
    };
}
export default context;