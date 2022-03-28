'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const dotenv_1 = __importDefault(require('dotenv'));
const cors_1 = __importDefault(require('cors'));
const typedefs_1 = __importDefault(require('./graphql/typedefs'));
const resolvers_1 = __importDefault(require('./graphql/resolvers'));
const apollo_server_express_1 = require('apollo-server-express');
const client_1 = require('@prisma/client');
dotenv_1.default.config();
const server = new apollo_server_express_1.ApolloServer({
  typeDefs: typedefs_1.default,
  resolvers: resolvers_1.default,
});
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(
  (0, cors_1.default)({ origin: `http//:localhost:${process.env.SERVER_PORT}` })
);
app.use(express_1.default.json());
server.applyMiddleware({ app });
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
