import UserResolvers from '@user/resolvers'
import AnimalResolvers from '@animal/resolvers'
const resolvers = {
  ...UserResolvers,
  ...AnimalResolvers,
  Query: {
    ...UserResolvers.Query,
    ...AnimalResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...AnimalResolvers.Mutation,
  },
};
export default resolvers;
