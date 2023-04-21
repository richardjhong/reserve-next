import { gql } from '@apollo/client'

export const typeDefs = gql`
  type User {
    first_name: String!
    last_name: String!
    email: String!
    phone: String!
    city: String!
    password: String!
  }

  input RegisterUserInput {
    first_name: String!
    last_name: String!
    email: String!
    phone: String!
    city: String!
    password: String!
  }

  type RegisterUserInputValidation {
    status: Int!
    message: String!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): RegisterUserInputValidation!
  }
`