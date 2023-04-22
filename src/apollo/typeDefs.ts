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

  type FilteredUser {
    id: Int
    first_name: String
    last_name: String
    email: String
    city: String
  }

  input RegisterUserInput {
    first_name: String!
    last_name: String!
    email: String!
    phone: String!
    city: String!
    password: String!
  }

  type UserInputValidation {
    token: ID!
  }

  input ValidateLoginInput {
    email: String!
    password: String!
  }

  type Query {
    allUsers: [User!]!
    validUser: FilteredUser!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): UserInputValidation!
    loginUser(input: ValidateLoginInput!): UserInputValidation!
  }
`