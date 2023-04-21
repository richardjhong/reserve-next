import { Resolvers } from '@/generated/graphql-backend';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt';
import { assignToken, authorizedUser, validateInput } from '../../utils/authHelpers';

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
    },
    validUser: async (_parent, _args, { req }) => {
      const bearerToken = req.headers.get('authorization') as string;

      return authorizedUser(bearerToken);
    }
  },
  ValidUserResult: {
    __resolveType(obj) {
      if (obj.type === "Error") {
        return "ValidUserError";
      }
      return "ValidUserSuccess";
    }
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      try {
        const { first_name, last_name, email, phone, city, password } = input;

        const errors = await validateInput(email, password, first_name, last_name, city, phone);

        if (errors.length) {
          return {
            status: 400,
            message: errors[0],
            token: ''
          };
        };

        const userWithEmail = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (userWithEmail) 
        return { 
          status: 400, 
          message: 'Email is associated with another account',
          token: ''
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
          data: {
            first_name,
            last_name,
            password: hashedPassword,
            city,
            phone,
            email
          }
        });

        return assignToken(user.email, 'register');
      } catch (err: any) {
        throw new GraphQLError('Failed to register user: ' + err.message);
      }
    },
    validateLogin: async (_, { input }) => {
      try {
        const { email, password } = input;

        const errors = await validateInput(email, password);

        if (errors.length) {
          return {
            status: 400,
            message: errors[0],
            token: ''
          };
        };

        const userWithEmail = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (!userWithEmail) 
        return { 
          status: 401, 
          message: 'Email or password is invalid',
          token: ''
        };

        const isMatch = await bcrypt.compare(password, userWithEmail.password);

        if (!isMatch)
        return { 
          status: 401, 
          message: 'Email or password is invalid',
          token: ''
        }; 

        return assignToken(email, 'login');
      } catch (err: any) {
        throw new GraphQLError('Failed to login user: ' + err.message);
      }
    }
  },
};
