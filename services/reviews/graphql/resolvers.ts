import { convertDocumentToString } from "graphql-config";
import { Resolvers } from "../generated/graphql/resolvers.ts";
import { typeDefs } from "./type-defs.ts";

export const resolvers: Resolvers = {
  Review: {
    author: (review) => ({ id: review.authorId }),
    product: (review) => ({ upc: review.productUpc }),
  },
  User: {
    reviews: async (user, _input, context) => {
      const result = await context.useCases.findReviewsByAuthorId.handler({
        authorId: user.id,
      });
      return result.reviews;
    },
    totalReviews: async (user, _input, context) => {
      const result = await context.useCases.findReviewsByAuthorId.handler({
        authorId: user.id,
      });
      return result.reviews.length;
    },
  },
  Product: {
    totalReviews: async (product, _input, context) => {
      const result = await context.useCases.findReviewsByProductUpc.handler({
        productUpc: product.upc,
      });
      return result.reviews.length;
    },
    reviews: async (product, _input, context) => {
      const result = await context.useCases.findReviewsByProductUpc.handler({
        productUpc: product.upc,
      });
      return result.reviews;
    },
    averageRating: async (product, _input, context) => {
      const result = await context.useCases.averageRating.handler({
        productUpc: product.upc,
      });
      return result.averageRating;
    },
  },
  Query: {
    review: async (_root, { id }, context) => {
      const result = await context.useCases.findReviewById.handler({ id });
      return result.review;
    },
    _users: (_root, { keys }) => keys,
    _products: (_root, { keys }) => keys,
    _sdl: () => convertDocumentToString(typeDefs),
  },
  Mutation: {
    createReview: async (_root, { input }, context) => {
      const { review } = await context.useCases.createReview.handler({
        signedInUser: context.signedInUser,
        productUpc: input.productUpc,
        rating: input.rating,
        body: input.body ?? undefined,
      });
      return {
        review,
        query: {},
      };
    },
  },
};
