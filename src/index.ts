import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
import {ApolloServer} from "apollo-server-express";
dotenv.config();
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
app.use(cors({ origin: `http//:localhost:${process.env.SERVER_PORT}` }));
app.use(express.json());
server.applyMiddleware({ app });
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
