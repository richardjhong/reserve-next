// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
// import { setContext } from '@apollo/client/link/context';

// let client: ApolloClient<any> | null = null;

// export const getClient = () => {
//   // create a new client if there's no existing one
//   // or if we are running on the server.
//   if (!client || typeof window === "undefined") {
//     client = new ApolloClient({
//       link: new HttpLink({
//         uri: "http://localhost:3000/api/graphql",
//         credentials: 'include'
//       }),
//       cache: new InMemoryCache(),
//     });
//   }

//   return client;
// };



// "use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getToken } from "../utils/getAuthToken";

let client: ApolloClient<any> | null = null;

export const getClient = () => {

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: getToken(),
      }
    }
  });



  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: authLink.concat(new HttpLink({
        uri: "http://localhost:3000/api/graphql",
        credentials: 'include'
      })),
      cache: new InMemoryCache(),
    });
  }

  return client;
};


