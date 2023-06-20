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
  ID: { input: string | number; output: string; }
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

export type SignedInUserFragment = { __typename?: 'Query', signedInUser?: { __typename?: 'User', id: string, name: string, username: string } | null };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInPayload', token: string, query: { __typename?: 'Query', signedInUser?: { __typename?: 'User', id: string, name: string, username: string } | null } } };

export type SignedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type SignedInUserQuery = { __typename?: 'Query', signedInUser?: { __typename?: 'User', id: string, name: string, username: string } | null };

export type ProductDetailsFragment = { __typename?: 'Product', name: string, price: number, weight: number, imageUrl: string, isNew: boolean, inStock?: boolean | null, shippingEstimate?: number | null, totalReviews: number, averageRating?: number | null, reviews?: Array<{ __typename?: 'Review', id: string, body?: string | null, rating: number, author?: { __typename?: 'User', name: string, username: string, totalReviews: number } | null } | null> | null };

export type ProductSummaryFragment = { __typename?: 'Product', upc: string, name: string, price: number, weight: number, imageUrl: string, isNew: boolean, inStock?: boolean | null, shippingEstimate?: number | null, totalReviews: number, averageRating?: number | null };

export type ProductQueryVariables = Exact<{
  upc: Scalars['ID']['input'];
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', name: string, price: number, weight: number, imageUrl: string, isNew: boolean, inStock?: boolean | null, shippingEstimate?: number | null, totalReviews: number, averageRating?: number | null, reviews?: Array<{ __typename?: 'Review', id: string, body?: string | null, rating: number, author?: { __typename?: 'User', name: string, username: string, totalReviews: number } | null } | null> | null } | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', upc: string, name: string, price: number, weight: number, imageUrl: string, isNew: boolean, inStock?: boolean | null, shippingEstimate?: number | null, totalReviews: number, averageRating?: number | null } | null> };

export const SignedInUserFragmentDoc = gql`
    fragment SignedInUser on Query {
  signedInUser {
    id
    name
    username
  }
}
    `;
export const ProductDetailsFragmentDoc = gql`
    fragment ProductDetails on Product {
  name
  price
  weight
  imageUrl
  isNew
  inStock
  shippingEstimate
  totalReviews
  averageRating
  reviews {
    id
    body
    rating
    author {
      name
      username
      totalReviews
    }
  }
}
    `;
export const ProductSummaryFragmentDoc = gql`
    fragment ProductSummary on Product {
  upc
  name
  price
  weight
  imageUrl
  isNew
  inStock
  shippingEstimate
  totalReviews
  averageRating
}
    `;
export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    token
    query {
      ...SignedInUser
    }
  }
}
    ${SignedInUserFragmentDoc}`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignedInUserDocument = gql`
    query SignedInUser {
  ...SignedInUser
}
    ${SignedInUserFragmentDoc}`;

/**
 * __useSignedInUserQuery__
 *
 * To run a query within a React component, call `useSignedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useSignedInUserQuery(baseOptions?: Apollo.QueryHookOptions<SignedInUserQuery, SignedInUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignedInUserQuery, SignedInUserQueryVariables>(SignedInUserDocument, options);
      }
export function useSignedInUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignedInUserQuery, SignedInUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignedInUserQuery, SignedInUserQueryVariables>(SignedInUserDocument, options);
        }
export type SignedInUserQueryHookResult = ReturnType<typeof useSignedInUserQuery>;
export type SignedInUserLazyQueryHookResult = ReturnType<typeof useSignedInUserLazyQuery>;
export type SignedInUserQueryResult = Apollo.QueryResult<SignedInUserQuery, SignedInUserQueryVariables>;
export const ProductDocument = gql`
    query Product($upc: ID!) {
  product(upc: $upc) {
    ...ProductDetails
  }
}
    ${ProductDetailsFragmentDoc}`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      upc: // value for 'upc'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const ProductsDocument = gql`
    query Products {
  products(upcs: [1, 2, 3]) {
    ...ProductSummary
  }
}
    ${ProductSummaryFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;