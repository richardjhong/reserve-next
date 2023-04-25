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

  type RegisterUserOutput {
    first_name: String!
    last_name: String!
    email: String!
    phone: String!
    city: String!,
    response: String!
  }

  input ValidateLoginInput {
    email: String!
    password: String!
  }

  type ValidateLoginOutput {
    email: String!
    response: String!
  }

  type Query {
    allUsers: [User!]!
    validUser: FilteredUser!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): RegisterUserOutput!
    loginUser(input: ValidateLoginInput!): ValidateLoginOutput!
  }
`