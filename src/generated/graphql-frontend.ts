import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AvailabilitiesInput = {
  day: Scalars['String'];
  partySize: Scalars['String'];
  slug: Scalars['String'];
  time: Scalars['String'];
};

export type Bookings = {
  __typename?: 'Bookings';
  available?: Maybe<Scalars['Boolean']>;
  time: Scalars['String'];
};

export type FilteredUser = {
  __typename?: 'FilteredUser';
  city?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_name?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  loginUser: ValidateLoginOutput;
  registerUser: RegisterUserOutput;
};


export type MutationLoginUserArgs = {
  input: ValidateLoginInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  availabilities: Array<Bookings>;
  validUser: FilteredUser;
};


export type QueryAvailabilitiesArgs = {
  input: AvailabilitiesInput;
};

export type RegisterUserInput = {
  city: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type RegisterUserOutput = {
  __typename?: 'RegisterUserOutput';
  city: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  phone: Scalars['String'];
  response: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  city: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type ValidateLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ValidateLoginOutput = {
  __typename?: 'ValidateLoginOutput';
  email: Scalars['String'];
  response: Scalars['String'];
};

export type LoginUserMutationVariables = Exact<{
  input: ValidateLoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'ValidateLoginOutput', email: string, response: string } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'RegisterUserOutput', first_name: string, last_name: string, email: string, phone: string, city: string, response: string } };

export type ValidUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidUserQuery = { __typename?: 'Query', validUser: { __typename?: 'FilteredUser', id?: number | null, first_name?: string | null, last_name?: string | null, email?: string | null, city?: string | null } };

export type CheckAvailabilityQueryVariables = Exact<{
  input: AvailabilitiesInput;
}>;


export type CheckAvailabilityQuery = { __typename?: 'Query', availabilities: Array<{ __typename?: 'Bookings', time: string, available?: boolean | null }> };


export const LoginUserDocument = gql`
    mutation LoginUser($input: ValidateLoginInput!) {
  loginUser(input: $input) {
    email
    response
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(input: $input) {
    first_name
    last_name
    email
    phone
    city
    response
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const ValidUserDocument = gql`
    query ValidUser {
  validUser {
    id
    first_name
    last_name
    email
    city
  }
}
    `;

/**
 * __useValidUserQuery__
 *
 * To run a query within a React component, call `useValidUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidUserQuery(baseOptions?: Apollo.QueryHookOptions<ValidUserQuery, ValidUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidUserQuery, ValidUserQueryVariables>(ValidUserDocument, options);
      }
export function useValidUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidUserQuery, ValidUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidUserQuery, ValidUserQueryVariables>(ValidUserDocument, options);
        }
export type ValidUserQueryHookResult = ReturnType<typeof useValidUserQuery>;
export type ValidUserLazyQueryHookResult = ReturnType<typeof useValidUserLazyQuery>;
export type ValidUserQueryResult = Apollo.QueryResult<ValidUserQuery, ValidUserQueryVariables>;
export const CheckAvailabilityDocument = gql`
    query CheckAvailability($input: AvailabilitiesInput!) {
  availabilities(input: $input) {
    time
    available
  }
}
    `;

/**
 * __useCheckAvailabilityQuery__
 *
 * To run a query within a React component, call `useCheckAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckAvailabilityQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckAvailabilityQuery(baseOptions: Apollo.QueryHookOptions<CheckAvailabilityQuery, CheckAvailabilityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckAvailabilityQuery, CheckAvailabilityQueryVariables>(CheckAvailabilityDocument, options);
      }
export function useCheckAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckAvailabilityQuery, CheckAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckAvailabilityQuery, CheckAvailabilityQueryVariables>(CheckAvailabilityDocument, options);
        }
export type CheckAvailabilityQueryHookResult = ReturnType<typeof useCheckAvailabilityQuery>;
export type CheckAvailabilityLazyQueryHookResult = ReturnType<typeof useCheckAvailabilityLazyQuery>;
export type CheckAvailabilityQueryResult = Apollo.QueryResult<CheckAvailabilityQuery, CheckAvailabilityQueryVariables>;