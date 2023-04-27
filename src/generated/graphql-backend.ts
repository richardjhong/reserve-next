import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type BookReservationInput = {
  bkr_email: Scalars['String'];
  bkr_f_name: Scalars['String'];
  bkr_l_name: Scalars['String'];
  bkr_phone: Scalars['String'];
  day: Scalars['String'];
  occasion?: InputMaybe<Scalars['String']>;
  partySize: Scalars['String'];
  request?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  time: Scalars['String'];
};

export type BookReservationOutput = {
  __typename?: 'BookReservationOutput';
  bkr_email: Scalars['String'];
  bkr_f_name: Scalars['String'];
  bkr_l_name: Scalars['String'];
  bkr_phone: Scalars['String'];
  booking_time: Scalars['Date'];
  num_of_people: Scalars['Int'];
  occasion?: Maybe<Scalars['String']>;
  request?: Maybe<Scalars['String']>;
  restaurant_id: Scalars['Int'];
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
  bookReservation: BookReservationOutput;
  loginUser: ValidateLoginOutput;
  registerUser: RegisterUserOutput;
};


export type MutationBookReservationArgs = {
  input: BookReservationInput;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AvailabilitiesInput: AvailabilitiesInput;
  BookReservationInput: BookReservationInput;
  BookReservationOutput: ResolverTypeWrapper<BookReservationOutput>;
  Bookings: ResolverTypeWrapper<Bookings>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  FilteredUser: ResolverTypeWrapper<FilteredUser>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterUserInput: RegisterUserInput;
  RegisterUserOutput: ResolverTypeWrapper<RegisterUserOutput>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  ValidateLoginInput: ValidateLoginInput;
  ValidateLoginOutput: ResolverTypeWrapper<ValidateLoginOutput>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AvailabilitiesInput: AvailabilitiesInput;
  BookReservationInput: BookReservationInput;
  BookReservationOutput: BookReservationOutput;
  Bookings: Bookings;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  FilteredUser: FilteredUser;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  RegisterUserInput: RegisterUserInput;
  RegisterUserOutput: RegisterUserOutput;
  String: Scalars['String'];
  User: User;
  ValidateLoginInput: ValidateLoginInput;
  ValidateLoginOutput: ValidateLoginOutput;
};

export type BookReservationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookReservationOutput'] = ResolversParentTypes['BookReservationOutput']> = {
  bkr_email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bkr_f_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bkr_l_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bkr_phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  booking_time?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  num_of_people?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  occasion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  request?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  restaurant_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bookings'] = ResolversParentTypes['Bookings']> = {
  available?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FilteredUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['FilteredUser'] = ResolversParentTypes['FilteredUser']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  bookReservation?: Resolver<ResolversTypes['BookReservationOutput'], ParentType, ContextType, RequireFields<MutationBookReservationArgs, 'input'>>;
  loginUser?: Resolver<ResolversTypes['ValidateLoginOutput'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
  registerUser?: Resolver<ResolversTypes['RegisterUserOutput'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  availabilities?: Resolver<Array<ResolversTypes['Bookings']>, ParentType, ContextType, RequireFields<QueryAvailabilitiesArgs, 'input'>>;
  validUser?: Resolver<ResolversTypes['FilteredUser'], ParentType, ContextType>;
};

export type RegisterUserOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterUserOutput'] = ResolversParentTypes['RegisterUserOutput']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  response?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidateLoginOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidateLoginOutput'] = ResolversParentTypes['ValidateLoginOutput']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  response?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BookReservationOutput?: BookReservationOutputResolvers<ContextType>;
  Bookings?: BookingsResolvers<ContextType>;
  Date?: GraphQLScalarType;
  FilteredUser?: FilteredUserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterUserOutput?: RegisterUserOutputResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ValidateLoginOutput?: ValidateLoginOutputResolvers<ContextType>;
};

