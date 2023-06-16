import { GraphQLError, convertDocumentToString } from "graphql-config";
import { typeDefs } from "./type-defs.js";
import { Resolvers } from "../generated/graphql/resolvers.js";

const products = [
  { upc: "1", name: "Table", price: 899, weight: 100 },
  { upc: "2", name: "Couch", price: 1299, weight: 1000 },
  { upc: "3", name: "Chair", price: 54, weight: 50 },
];

export const resolvers: Resolvers = {
  Query: {
    topProducts: (_root, args) => products.slice(0, args.first),
    products: (_root, { upcs }) =>
      upcs.map((upc) => {
        const product = products.find((product) => product.upc === upc);
        if (product === undefined) {
          throw new GraphQLError("Record not found", {
            extensions: {
              code: "NOT_FOUND",
            },
          });
        }
        return product;
      }),
    _sdl: () => convertDocumentToString(typeDefs),
  },
};
