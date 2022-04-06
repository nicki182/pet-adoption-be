import express from "express";
import cors from "cors";
import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
import RedisClient from "./DB/redis";
import { ApolloServer } from "apollo-server-express";
//import { PrismaClient } from '@prisma/client';
class Sever {
  async start() {
    const server = new ApolloServer({ typeDefs, resolvers });
    //const prisma = new PrismaClient();

    const app = express();
    app.use(cors());
    app.use(express.json());
    await server.start();
    server.applyMiddleware({ app });
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}`);
      console.log(
        `Server graphql server is running on port http://localhost:4000${server.graphqlPath}`
      );
    });
  }
}
const server = new Sever();

server.start();
