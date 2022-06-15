const typeDefs = `
type Query {
    getUserById(id: String!): User
}
type Mutation {
    updateUser(user: UserInput!): User
}
type User {
    id: ID!
    email: String!
    name: String!
    role: String!
}    
input UserInput {
    id:ID!
    email: String
    name: String
    role: String
    password: String
}
`;
export default typeDefs;