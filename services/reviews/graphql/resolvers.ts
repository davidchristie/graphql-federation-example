import { convertDocumentToString, GraphQLError } from "graphql-config";
import { Resolvers } from "../generated/graphql/resolvers.js";
import { typeDefs } from "./type-defs.js";

const reviews = [
  { id: "1", authorId: "1", productUpc: "1", body: "Love it!", rating: 5 },
  {
    id: "2",
    authorId: "1",
    productUpc: "2",
    body: "Too expensive.",
    rating: 4,
  },
  {
    id: "3",
    authorId: "2",
    productUpc: "3",
    body: "Could be better.",
    rating: 3,
  },
  {
    id: "4",
    authorId: "2",
    productUpc: "1",
    body: "Prefer something else.",
    rating: 2,
  },
];

export const resolvers: Resolvers = {
  Review: {
    author: (review) => ({ id: review.authorId }),
    product: (review) => ({ upc: review.productUpc }),
  },
  User: {
    reviews: (user) => reviews.filter((review) => review.authorId === user.id),
    totalReviews: (user) =>
      reviews.filter((review) => review.authorId === user.id).length,
  },
  Product: {
    totalReviews: (product) =>
      reviews.filter((review) => review.productUpc === product.upc).length,
    reviews: (product) =>
      reviews.filter((review) => review.productUpc === product.upc),
    averageRating: (product) => {
      const ratings = reviews
        .filter((review) => review.productUpc === product.upc)
        .map((review) => review.rating);
      return ratings.length === 0
        ? null
        : ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    },
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
    _users: (_root, { keys }) => keys,
    _products: (_root, { keys }) => keys,
    _sdl: () => convertDocumentToString(typeDefs),
  },
};
