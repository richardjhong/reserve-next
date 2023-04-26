import { gql } from '@apollo/client'
import { GraphQLScalarType, Kind } from 'graphql';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value;
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

export const typeDefs = gql`
  scalar Date

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

  input AvailabilitiesInput {
    slug: String!
    day: String!
    time: String!
    partySize: String!
  }

  type Bookings {
    time: String!
    available: Boolean
  }

  input BookReservationInput {
    slug: String!
    day: String!
    time: String!
    partySize: String!
  }

  type Query {
    allUsers: [User!]!
    validUser: FilteredUser!
    availabilities(input: AvailabilitiesInput!): [Bookings!]!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): RegisterUserOutput!
    loginUser(input: ValidateLoginInput!): ValidateLoginOutput!
    bookReservation(input: BookReservationInput!): String!
  }
`