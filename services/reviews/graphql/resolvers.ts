import { convertDocumentToString, GraphQLError } from "graphql-config";
import { Resolvers } from "../generated/graphql/resolvers.js";
import { typeDefs } from "./type-defs.js";

const reviews = [
  { id: "1", authorId: "1", productUpc: "1", body: "Love it!" },
  { id: "2", authorId: "1", productUpc: "2", body: "Too expensive." },
  { id: "3", authorId: "2", productUpc: "3", body: "Could be better." },
  { id: "4", authorId: "2", productUpc: "1", body: "Prefer something else." },
];

export const resolvers: Resolvers = {
  Review: {
    author: (review): any => ({ id: (review as any).authorId }),
    product: (review) => ({ upc: (review as any).productUpc }),
  },
  User: {
    reviews: (user) => reviews.filter((review) => review.authorId === user.id),
    totalReviews: (user) =>
      reviews.filter((review) => review.authorId === user.id).length,
  },
  Product: {
    reviews: (product) =>
      reviews.filter((review) => review.productUpc === product.upc),
  },
  Query: {
    review: (_root, { id }) => {
      const review = reviews.find((review) => review.id === id);
      if (review === undefined) {
        throw new GraphQLError("Record not found", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return review;
    },
    _users: (_root, { keys }): any => keys,
    _products: (_root, { input }: any) => input.keys,
    _sdl: () => convertDocumentToString(typeDefs),
  },
};
