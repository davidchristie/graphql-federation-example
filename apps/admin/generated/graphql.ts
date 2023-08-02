import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  _ProductKey: { input: any; output: any; }
  _UserKey: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn: SignInPayload;
};


export type MutationSignInArgs = {
  input: SignInInput;
};

/** Represents a Product available for resale. */
export type Product = {
  __typename?: 'Product';
  averageRating?: Maybe<Scalars['Float']['output']>;
  imageUrl: Scalars['String']['output'];
  /** Specifies if this product is currently stocked. */
  inStock?: Maybe<Scalars['Boolean']['output']>;
  isNew: Scalars['Boolean']['output'];
  /** The name of this product. */
  name: Scalars['String']['output'];
  /** The price of this product in cents. */
  price: Scalars['Int']['output'];
  reviews?: Maybe<Array<Maybe<Review>>>;
  /** Specifies the estimated shipping cost of this product, in cents. */
  shippingEstimate?: Maybe<Scalars['Int']['output']>;
  /** Reviews written for this product */
  totalReviews: Scalars['Int']['output'];
  /** The primary key of this product. */
  upc: Scalars['ID']['output'];
  /** The weight of this product in grams. */
  weight: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  _adminListUsers: Array<User>;
  _products: Array<Maybe<Product>>;
  _sdl: Scalars['String']['output'];
  _users: Array<Maybe<User>>;
  mostStockedProduct?: Maybe<Product>;
  product?: Maybe<Product>;
  products: Array<Maybe<Product>>;
  review?: Maybe<Review>;
  signedInUser?: Maybe<User>;
  topProducts: Array<Maybe<Product>>;
  user?: Maybe<User>;
};


export type Query_ProductsArgs = {
  keys: Array<Scalars['_ProductKey']['input']>;
};


export type Query_UsersArgs = {
  keys: Array<Scalars['_UserKey']['input']>;
};


export type QueryProductArgs = {
  upc: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  order?: InputMaybe<Scalars['String']['input']>;
  upcs: Array<Scalars['ID']['input']>;
};


export type QueryReviewArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTopProductsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Review = {
  __typename?: 'Review';
  author?: Maybe<User>;
  body?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  product?: Maybe<Product>;
  rating: Scalars['Float']['output'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  query: Query;
  token: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reviews?: Maybe<Array<Maybe<Review>>>;
  totalReviews: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type UserSummaryFragment = { __typename?: 'User', id: string, name: string, username: string };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', _adminListUsers: Array<{ __typename?: 'User', id: string, name: string, username: string }> };

export const UserSummaryFragmentDoc = gql`
    fragment UserSummary on User {
  id
  name
  username
}
    `;
export const UsersDocument = gql`
    query Users {
  _adminListUsers {
    ...UserSummary
  }
}
    ${UserSummaryFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;