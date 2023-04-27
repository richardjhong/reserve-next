import { Resolvers } from '@/generated/graphql-backend';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt';
import { assignToken, authorizedUser, validateInput } from '../../utils/authHelpers';
import { times } from '@/app/data';
import { dateScalar } from './typeDefs';
import { findAvailableTables } from '../../utils/findAvailableTables';

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
        return await authorizedUser(bearerToken);   
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
    },
    availabilities: async (_parent, { input }) => {
      try {
        const { slug, day, time, partySize } = input;

        const restaurant = await prisma.restaurant.findUnique({
          where: {
            slug
          },
          select: {
            tables: true,
            open_time: true,
            close_time: true
          }
        });
      
        if (!restaurant) {
          throw new GraphQLError(
            'Invalid data provided',
            {
              extensions: {
                code: 'BAD_USER_INPUT'
              }
            }
          );
        };
      
        const searchTimesWithTables = await findAvailableTables({ day, time, restaurant });

        if (!searchTimesWithTables) 
        throw new GraphQLError(`Invalid data provided`, {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
        
        const availabilities = searchTimesWithTables.map(t => {
          const sumSeats = t.tables.reduce((sum, table) => {
            return sum + table.seats
          }, 0);

          return {
            time: t.time,
            available: sumSeats >= parseInt(partySize),
          };

        }).filter(availability => {
          const timeIsAfterOpeningHour = new Date(`${day}T${availability.time}`) >= new Date(`${day}T${restaurant.open_time}`);
          const timeIsBeforeClosingHour = new Date(`${day}T${availability.time}`) <= new Date(`${day}T${restaurant.close_time}`);

          return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
        });

        return availabilities;
      } catch (err: any) {
        throw new GraphQLError(
          `Error retrieving availability: ${err.message}`,
        );
      };
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
          city: user.city,
          response: await assignToken(email) || ''
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
    },
    bookReservation: async (_, { input }, { req }) => {
      const { slug, day, time, partySize, occasion, request } = input;
      try {

        const restaurant = await prisma.restaurant.findUnique({
          where: {
            slug
          },
          select: {
            id: true,
            tables: true,
            open_time: true,
            close_time: true
          }
        });

        if (!restaurant) 
        throw new GraphQLError(`Restaurant not found`, {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });

        if (
          (new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`)) || 
          (new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`))
        )
        throw new GraphQLError(`Booking time is outside of restaurant operating hours window`, {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });

        const searchTimesWithTables = await findAvailableTables({ day, time, restaurant });

        if (!searchTimesWithTables) 
        throw new GraphQLError(`Invalid data provided`, {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });

        const searchTimeWithTables = searchTimesWithTables.find((t) => {
          return t.date.toISOString() === new Date(`${day}T${time}`).toISOString()
        });

        if (!searchTimeWithTables)
        throw new GraphQLError(`No availability, cannot book`, {
          extensions: {
            code: 'NO_MATCHING_DATA'
          }
        });
        
        interface TablesCount {
          [key: number]: number[];
        };
        
        const tablesCount: TablesCount = {};

        searchTimeWithTables.tables.forEach(table => {
          tablesCount[table.seats] ? tablesCount[table.seats].push(table.id) : tablesCount[table.seats] = [table.id];
        });

        const tablesToBook: number[] = [];
        let seatsRemaining = parseInt(partySize);        

        while (seatsRemaining > 0) {
          if (seatsRemaining >= 3) {
            if (tablesCount[4] && tablesCount[4].length) {
              tablesToBook.push(tablesCount[4].shift() as number);
              seatsRemaining -= 4;
            } else if (tablesCount[2] && tablesCount[2].length) {
              tablesToBook.push(tablesCount[2].shift() as number);
              seatsRemaining -= 2;
            } else {
              break;
            }
          } else {
            if (tablesCount[2] && tablesCount[2].length) {
              tablesToBook.push(tablesCount[2].shift() as number);
              seatsRemaining -= 2;
            } else if (tablesCount[4] && tablesCount[4].length) {
              tablesToBook.push(tablesCount[4].shift() as number);
              seatsRemaining -= 4;
            } else {
              break;
            }
          }
        };
        

        if (seatsRemaining > 0)
        throw new GraphQLError(`Unable to accommodate party size with current vacant tables, please try reserving a different time or with a different party size`, {
          extensions: {
            code: 'NO_MATCHING_DATA'
          }
        });

        const bearerToken = req.headers.get('authorization');
        const user = await authorizedUser(bearerToken);

        if (!user) 
        throw new GraphQLError('You must be logged in as a valid user to book a table', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        });

        const { first_name: bkr_f_name, last_name: bkr_l_name, email: bkr_email, phone: bkr_phone } = user;

        const booking = await prisma.booking.create({
          data: {
           num_of_people: parseInt(partySize),
           booking_time: new Date(`${day}T${time}`),
           bkr_email,
           bkr_f_name,
           bkr_l_name,
           bkr_phone,
           restaurant_id: restaurant.id,
           bkr_occasion: occasion,
           bkr_request: request
          }
        });

        const bookingsOnTablesData = tablesToBook.map(table_id => {
          return {
            table_id,
            booking_id: booking.id
          };
        });

        await prisma.bookingsOnTable.createMany({
          data: bookingsOnTablesData   
        })

        return 'hi'
      } catch (err: any) {
        throw new GraphQLError(`${err.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
    }
  },
  Date: dateScalar
};
