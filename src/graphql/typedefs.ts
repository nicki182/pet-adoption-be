import { gql } from 'apollo-server-express';
const typeDefs = gql`
  type Query {
    hello: String
  }
  type User {
    id: ID!
    name: String
  }
`;
export default typeDefs;
