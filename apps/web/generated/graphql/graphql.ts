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
  _ProductKey: { input: any; output: any; }
  _UserKey: { input: any; output: any; }
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
  me?: Maybe<User>;
  mostStockedProduct?: Maybe<Product>;
  products: Array<Maybe<Product>>;
  review?: Maybe<Review>;
  topProducts: Array<Maybe<Product>>;
  user?: Maybe<User>;
};


export type Query_ProductsArgs = {
  keys: Array<Scalars['_ProductKey']['input']>;
};


export type Query_UsersArgs = {
  keys: Array<Scalars['_UserKey']['input']>;
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

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reviews?: Maybe<Array<Maybe<Review>>>;
  totalReviews: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type ProductSummaryFragment = { __typename?: 'Product', upc: string, name: string, price: number, weight: number, imageUrl: string, isNew: boolean, inStock?: boolean | null, shippingEstimate?: number | null, totalReviews: number, averageRating?: number | null, reviews?: Array<{ __typename?: 'Review', id: string, body?: string | null, author?: { __typename?: 'User', name: string, username: string, totalReviews: number } | null } | null> | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', upc: string, name: string, price: number, weight: number, imageUrl: string, isNew: boolean, inStock?: boolean | null, shippingEstimate?: number | null, totalReviews: number, averageRating?: number | null, reviews?: Array<{ __typename?: 'Review', id: string, body?: string | null, author?: { __typename?: 'User', name: string, username: string, totalReviews: number } | null } | null> | null } | null> };

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
export const ProductSummaryFragmentDoc = new TypedDocumentString(`
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
  reviews {
    id
    body
    author {
      name
      username
      totalReviews
    }
  }
}
    `, {"fragmentName":"ProductSummary"}) as unknown as TypedDocumentString<ProductSummaryFragment, unknown>;
export const ProductsDocument = new TypedDocumentString(`
    query Products {
  products(upcs: [1, 2, 3]) {
    ...ProductSummary
  }
}
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
  reviews {
    id
    body
    author {
      name
      username
      totalReviews
    }
  }
}`) as unknown as TypedDocumentString<ProductsQuery, ProductsQueryVariables>;