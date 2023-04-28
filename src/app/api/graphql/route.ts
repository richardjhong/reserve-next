import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { schema } from '../../../apollo';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

type ApolloContext = {
  req: NextApiRequest
  res: NextApiResponse
}

const server = new ApolloServer<ApolloContext>(schema);

const handler = startServerAndCreateNextHandler(
  server, 
  { 
    context: async (req, res) => ({ req, res }) 
  },  
);

export async function GET(request: NextRequest) {
  return handler(request);
};

export async function POST(request: NextRequest) {
  return handler(request);
};
