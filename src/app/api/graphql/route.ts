import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { schema } from '../../../apollo';
import { NextApiRequest, NextApiResponse } from 'next';

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

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  return handler(request, response);
};

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  return handler(request, response);
};
