import { signToken } from "auth-config";
import { GraphQLError, convertDocumentToString } from "graphql-config";
import { users } from "../core/data/users.js";
import { Resolvers } from "../generated/graphql/resolvers.js";
import { typeDefs } from "./type-defs.js";

export const resolvers: Resolvers = {
  Query: {
    signedInUser: (_root, _input, context) => context.signedInUser,
    user: (_root, { id }) => {
      const user = users.find((user) => user.id === id);
      if (user === undefined) {
        throw new GraphQLError("Record not found", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return user;
    },
    _sdl: () => convertDocumentToString(typeDefs),
  },
  Mutation: {
    signIn: (_root, { input }, context) => {
      const signedInUser = users.find((user) => user.email === input.email);
      if (signedInUser === undefined) {
        throw new GraphQLError("Incorrect email or password");
      }
      context.signedInUser = signedInUser;
      const token = signToken({
        signedInUser,
        privateKeyOrSecret: context.secrets.auth.privateKeyOrSecret,
      });
      return {
        token,
        query: {},
      };
    },
  },
};
