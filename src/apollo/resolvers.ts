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
      try {
        const bearerToken = req.headers.get('authorization');
        return authorizedUser(bearerToken);   
      } catch (err) {
        throw new GraphQLError(
          'Authentication token is invalid, please log in',
          {
            extensions: {
              code: 'UNAUTHENTICATED',
            },
          }
        )
      }
    }
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      try {
        const { first_name, last_name, email, phone, city, password } = input;

        const errors = await validateInput(email, password, first_name, last_name, city, phone);

        if (errors.length) {
          throw new GraphQLError(errors[0], {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        };

        const userWithEmail = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (userWithEmail) 
        throw new GraphQLError(`An account with email ${email} already exists`, {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })

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

        return {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          city: user.city
        }
        
      } catch (err: any) {
        throw new GraphQLError(err.message);
      }
    },
    loginUser: async (_, { input }) => {
      try {      
        const { email, password } = input;

        const errors = await validateInput(email, password);

        if (errors.length) {
          throw new GraphQLError(errors[0], {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        };

        const userWithEmail = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (!userWithEmail) 
        throw new GraphQLError('Invalid email', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })

        const isMatch = await bcrypt.compare(password, userWithEmail.password);

        if (!isMatch)
        throw new GraphQLError('Invalid password', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
        
        return {
          email: userWithEmail.email,
          response: await assignToken(email) || ''
        };


      } catch (err: any) {
        throw new GraphQLError(err.message);
      }
    }
  },
};
