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
    status: Int!
    message: String!
    token: ID!
  }

  union ValidUserResult = ValidUserSuccess | ValidUserError

  type ValidUserError {
    status: Int!
    message: String!
    type: String!
  }

  type ValidUserSuccess {
    user: FilteredUser!
    type: String!
  }

  input ValidateLoginInput {
    email: String!
    password: String!
  }

  type Query {
    allUsers: [User!]!
    validUser: ValidUserResult!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): UserInputValidation!
    loginUser(input: ValidateLoginInput!): UserInputValidation!
  }
`