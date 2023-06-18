/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment ProductSummary on Product {\n    upc\n    name\n    price\n    weight\n    imageUrl\n    isNew\n    inStock\n    shippingEstimate\n    totalReviews\n    averageRating\n    reviews {\n      id\n      body\n      author {\n        name\n        username\n        totalReviews\n      }\n    }\n  }\n": types.ProductSummaryFragmentDoc,
    "\n  fragment SignedInUser on Query {\n    signedInUser {\n      id\n      name\n      username\n    }\n  }\n": types.SignedInUserFragmentDoc,
    "\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      token\n      query {\n        ...SignedInUser\n      }\n    }\n  }\n": types.SignInDocument,
    "\n  query Products {\n    products(upcs: [1, 2, 3]) {\n      ...ProductSummary\n    }\n  }\n": types.ProductsDocument,
    "\n  query SignedInUser {\n    ...SignedInUser\n  }\n": types.SignedInUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductSummary on Product {\n    upc\n    name\n    price\n    weight\n    imageUrl\n    isNew\n    inStock\n    shippingEstimate\n    totalReviews\n    averageRating\n    reviews {\n      id\n      body\n      author {\n        name\n        username\n        totalReviews\n      }\n    }\n  }\n"): typeof import('./graphql').ProductSummaryFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SignedInUser on Query {\n    signedInUser {\n      id\n      name\n      username\n    }\n  }\n"): typeof import('./graphql').SignedInUserFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($input: SignInInput!) {\n    signIn(input: $input) {\n      token\n      query {\n        ...SignedInUser\n      }\n    }\n  }\n"): typeof import('./graphql').SignInDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Products {\n    products(upcs: [1, 2, 3]) {\n      ...ProductSummary\n    }\n  }\n"): typeof import('./graphql').ProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SignedInUser {\n    ...SignedInUser\n  }\n"): typeof import('./graphql').SignedInUserDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
