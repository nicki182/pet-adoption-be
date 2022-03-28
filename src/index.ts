import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';
import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client'
dotenv.config();
class Sever {
  async start() {
const server = new ApolloServer({ typeDefs, resolvers });
const prisma = new PrismaClient()
const app = express();
app.use(cors());
app.use(express.json());
await server.start()
server.applyMiddleware({ app });
app.listen(process.env.SERVER_PORT, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
  }
}
const server = new Sever();
server.start();
