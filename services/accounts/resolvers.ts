import { GraphQLError, convertDocumentToString } from "graphql-config";
import { Resolvers } from "./generated/graphql/resolvers.js";
import { typeDefs } from "./type-defs.js";

const users = [
  { id: "1", name: "Ada Lovelace", username: "@ada" },
  { id: "2", name: "Alan Turing", username: "@complete" },
];

export const resolvers: Resolvers = {
  Query: {
    me: () => users[0],
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
};
