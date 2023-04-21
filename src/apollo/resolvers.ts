import { Resolvers } from '@/generated/graphql-backend';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql'
import validator from 'validator';

const prisma = new PrismaClient();

export const resolvers: Resolvers = {
  Query: {
    allUsers: async () => {
      try {
        const users = await prisma.user.findMany();
        return users ?? [];
      } catch (err) {
        throw new GraphQLError('Failed to fetch all users');
      }
    }
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      try {
        const { first_name, last_name, email, phone, city, password } = input;
        const errors: string[] = [];

        const validationSchema = [
          {
            valid: validator.isLength(first_name, {
              min: 1,
              max: 20
            }),
            errorMessage: "First name is invalid length, must be between 1 and 20 characters"
          },
          {
            valid: validator.isLength(last_name, {
              min: 1,
              max: 20
            }),
            errorMessage: "Last name is invalid length, must be between 1 and 20 characters"
          },
          {
            valid: validator.isEmail(email),
            errorMessage: "Email is invalid"
          },
          {
            valid: validator.isMobilePhone(phone),
            errorMessage: "Phone number is invalid"
          },
          {
            valid: validator.isLength(city, {min: 1}),
            errorMessage: "City is invalid"
          },
          {
            valid: validator.isStrongPassword(password),
            errorMessage: "Password is not strong enough"
          },
        ];

        validationSchema.forEach((check) => {
          if (!check.valid) {
            errors.push(check.errorMessage);            
          };
        });

        if (errors.length) {
          return {
            status: 400,
            message: errors[0]
          };
        }

        return {
          status: 200,
          message: 'Registration successful'
        };
      } catch (err: any) {
        throw new GraphQLError('Failed to register user: ' + err.message);
      }
    },
  },
};
