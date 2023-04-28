import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getToken } from "../utils/getAuthToken";

let client: ApolloClient<any> | null = null;

export const getClient = () => {

  const authLink = setContext(async (_, { headers }) => {
    const token = await getToken();
    return {
      headers: {
        ...headers,
        authorization: token,
      }
    }
  });

  const dynamicUri = () => {
    return process.env.NODE_ENV === 'production' ? 'https://task-tracker-mate.herokuapp.com/api/graphql' :
    'http://localhost:3000/api/graphql'
  };

  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: authLink.concat(new HttpLink({
        uri: dynamicUri(),
        credentials: 'include'
      })),
      cache: new InMemoryCache(),
    });
  }

  return client;
};


