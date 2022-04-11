import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import prisma from "./DB/prisma";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typedefs";
import expressWinston from "express-winston";
import {  transports } from "winston";
import { Server } from "http";

//import { PrismaClient } from '@prisma/client';
class Sever {
  async start() {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { prisma: prisma.getPrismaClient() },
    });
    //const prisma = new PrismaClient();

    const app = express();
    app.use(cors());
    app.use(express.json());
    await server.start();
    server.applyMiddleware({ app });
    app.use(
      expressWinston.logger({
        transports: [new transports.Console()],
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
      })
    );

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}`);
      console.log(
        `Server graphql server is on port http://localhost:4000${server.graphqlPath}`
      );
    });
  }
}
const server = new Sever();

server.start();

export default server;