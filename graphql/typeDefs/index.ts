import { gql } from 'graphql-tag';
import { userTypeDefs } from "./user";
import { transactionTypeDefs } from './transaction';

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [baseTypeDefs, userTypeDefs, transactionTypeDefs]