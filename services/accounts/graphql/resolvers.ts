import { convertDocumentToString } from "graphql-config";
import { Resolvers } from "../generated/graphql/resolvers.ts";
import { typeDefs } from "./type-defs.ts";

export const resolvers: Resolvers = {
  Query: {
    signedInUser: (_root, _input, context) => context.signedInUser,
    user: async (_root, { id }, context) => {
      const { user } = await context.useCases.findUser.handler({ id });
      return user;
    },
    _adminListUsers: async (_root, input, context) => {
      const { users } = await context.useCases.adminListUsers.handler({});
      return users;
    },
    _sdl: () => convertDocumentToString(typeDefs),
  },
  Mutation: {
    signIn: async (_root, { input }, context) => {
      const { signedInUser, token } = await context.useCases.signIn.handler({
        email: input.email,
        password: input.password,
      });
      context.signedInUser = signedInUser;
      return {
        token,
        query: {},
      };
    },
  },
};
