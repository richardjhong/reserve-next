import { times } from '@/app/data';
import { PrismaClient, Table } from '@prisma/client';
import { GraphQLError } from 'graphql'

interface FindAvailableTablesType {
  day: string;
  time: string;
  restaurant: {
    open_time: string;
    close_time: string;
    tables: Table[];
  }
}

const prisma = new PrismaClient();

export const findAvailableTables = async ({ day, time, restaurant }: FindAvailableTablesType) => {
  const searchTimes = times.find(t => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) 
  throw new GraphQLError(
    'Invalid data provided',
    {
      extensions: {
        code: 'BAD_USER_INPUT'
      }
    }
  );

  const bookings = await prisma.booking.findMany({
    where: {
     booking_time: {
      gte: new Date(`${day}T${searchTimes[0]}`),
      lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
     } 
    },
    select: {
      num_of_people: true,
      booking_time: true,
      tables: true
    }
  });

  const bookingTablesObj: {[key: string]: {[key: number]: true}} = {};

  bookings.forEach(booking => {
    bookingTablesObj[booking.booking_time.toISOString()] = booking.tables.reduce((obj, table) => {
      return {
        ...obj,
        [table.table_id]: true
      }
    }, {});
  });

  const { tables } = restaurant;

  const searchTimesWithTables = searchTimes.map(searchTime => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables
    }
  });

  searchTimesWithTables.forEach(t => {
    t.tables = t.tables.filter(table => {
      if (bookingTablesObj[t.date.toISOString()]) {
        if (bookingTablesObj[t.date.toISOString()][table.id]) {
          return false;
        }
      };
      return true;
    });
  });
  
  return searchTimesWithTables;
}