const typeDefs = `
type Query {
    getAllAnimals: [Animal]
    getAnimalById(id: String!): Animal
}
type Mutation {
    createAnimal(animal: AnimalInput!): Animal
    updateAnimal(id: String!, animal: AnimalInput!): Animal
    deleteAnimal(id: String!): Animal
}
type Animal {
    id: ID!
    name: String!
    age: Int!
    breed: String
    heigth: Int!
    weight: Int!
    dietaryRestrictions: String
    description: String
    image: String
    userId:ID
    state: String!
    type: String!
}
input AnimalInput {
    id:ID!
    name: String
    age: Int
    breed: String
    heigth: Int
    weight: Int
    dietaryRestrictions: String
    description: String
    image: String
    userId:ID
    state: String
    type: String
}
`;
export default typeDefs;