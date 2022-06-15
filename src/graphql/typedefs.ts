import { gql } from "apollo-server-express";
import UserTypeDefs from '@user/typedefs'
import AnimalTypeDefs from '@animal/typedefs'
const typeDefs = gql`
  ${UserTypeDefs}
  ${AnimalTypeDefs}
`;
export default typeDefs;
