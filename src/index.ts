import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import expressWinston from "express-winston";
import context from "@graphql/context";
import { transports } from "winston";
import resolvers from "@graphql/resolvers";
import typeDefs from "@graphql/typedefs";
import cookieParser from "cookie-parser";
import redis from "@redis/index";
import { authenticate } from './middlewares/authentication';
import  SessionServices  from '@session/services';
import SessionRoutes from '@routes/session';
import errorMiddleware from "./middlewares/error";
import  ServerError  from '@error/ServerError';
const app = express();
class Sever {
  async start() {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context
    });
    await redis.start();
    //Set redis client for services that uses redis find a better solutions than this
    SessionServices.setClient();
    //Express server
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    app.use(authenticate)
    app.use('/auth', SessionRoutes);
    //app.use("*/",(res,req)=>
    //req.send("Hello World!")),
    app.use(errorMiddleware)

    await server.start();
    server.applyMiddleware({ app });
    app.use(
      expressWinston.logger({
        transports: [new transports.Console()],
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
      })
    );

    process.env.NODE_ENV !== 'test' &&
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}`);
      console.log(
        `Server graphql server is on port http://localhost:${process.env.SERVER_PORT}${server.graphqlPath}`
      );
    });
  }
}
const server = new Sever();

//server.start();
export {app}
export default server;