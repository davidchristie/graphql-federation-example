/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  _Key: { input: any; output: any; }
};

/** Represents a Product available for resale. */
export type Product = {
  __typename?: 'Product';
  /** Specifies if this product is currently stocked. */
  inStock?: Maybe<Scalars['Boolean']['output']>;
  /** The name of this product. */
  name: Scalars['String']['output'];
  /** The price of this product in cents. */
  price: Scalars['Int']['output'];
  /** Reviews written for this product */
  reviews?: Maybe<Array<Maybe<Review>>>;
  /** Specifies the estimated shipping cost of this product, in cents. */
  shippingEstimate?: Maybe<Scalars['Int']['output']>;
  /** The primary key of this product. */
  upc: Scalars['ID']['output'];
  /** The weight of this product in grams. */
  weight: Scalars['Int']['output'];
};

export type ProductInput = {
  keys: Array<ProductKey>;
};

export type ProductKey = {
  upc: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  _products: Array<Maybe<Product>>;
  _sdl: Scalars['String']['output'];
  _users: Array<Maybe<User>>;
  me?: Maybe<User>;
  mostStockedProduct?: Maybe<Product>;
  products: Array<Maybe<Product>>;
  review?: Maybe<Review>;
  topProducts: Array<Maybe<Product>>;
  user?: Maybe<User>;
};


export type Query_ProductsArgs = {
  input?: InputMaybe<ProductInput>;
};


export type Query_UsersArgs = {
  keys: Array<UserKey>;
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
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reviews?: Maybe<Array<Maybe<Review>>>;
  totalReviews: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type UserKey = {
  id: Scalars['ID']['input'];
};

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', name: string, price: number, weight: number, inStock?: boolean | null, shippingEstimate?: number | null, reviews?: Array<{ __typename?: 'Review', id: string, body?: string | null, author?: { __typename?: 'User', name: string, username: string, totalReviews: number } | null, product?: { __typename?: 'Product', name: string, price: number } | null } | null> | null } | null> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const ProductsDocument = new TypedDocumentString(`
    query Products {
  products(upcs: [1, 2]) {
    name
    price
    weight
    inStock
    shippingEstimate
    reviews {
      id
      body
      author {
        name
        username
        totalReviews
      }
      product {
        name
        price
      }
    }
  }
}
    `) as unknown as TypedDocumentString<ProductsQuery, ProductsQueryVariables>;