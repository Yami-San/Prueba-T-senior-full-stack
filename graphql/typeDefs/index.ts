import { gql } from 'graphql-tag';
import { userTypeDefs } from "./user";

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [baseTypeDefs, userTypeDefs]