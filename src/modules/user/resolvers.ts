import UserServices from "./services";
const resolvers = {
    Query: {
        getUserById: async (parent, args, context) => {
            const user = await UserServices.getUserById(args.id);
            return user;
        }
    },
    Mutation: {
        updateUser: async (parent, args, context) => {
            const user = await UserServices.updateUser(args.user);
            return user;
        }
    }
}
export default resolvers;