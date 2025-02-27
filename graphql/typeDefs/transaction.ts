import { gql } from "graphql-tag";

export const transactionTypeDefs = gql`
  scalar DateTime

type User {
  id: ID!
  name: String
  email: String
  phone_number: String
}

type Transaction {
  id: ID!
  amount: Float!
  description: String!
  date: DateTime!
  user: User  # Agregado para incluir el usuario
}

extend type Query {
  transactions: [Transaction!]!
  transaction(id: ID!): Transaction
}

extend type Mutation {
  createTransaction(
    amount: Float!
    description: String!
    date: DateTime
  ): Transaction!
}

`;
