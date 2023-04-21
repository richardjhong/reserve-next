import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { schema } from '../../../apollo';
import { authorizedUser } from '../../../../utils/authHelpers';

const server = new ApolloServer<any>(schema);

const handler = startServerAndCreateNextHandler<NextRequest>(server, { context: async req => ({ 
 authResult: await authorizedUser(req.headers.get('authorization') ?? '') 
}) });

export async function GET(request: NextRequest) {
  return handler(request);
};

export async function POST(request: NextRequest) {
  return handler(request);
};