import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ID!
    name: String
    email: String
    phone_number: String
    role: Role
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    updateUser(id: ID!, name: String, role: Role): User!
  }
`;