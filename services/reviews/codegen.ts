import { type CodegenConfig } from "graphql-config";

const config: CodegenConfig = {
  schema: "./graphql/type-defs.ts",
  generates: {
    "./generated/graphql/resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        mappers: {
          Review: "../../graphql/models/review.js#ReviewModel",
          User: "../../graphql/models/user.js#UserModel",
        },
        scalars: {
          ID: {
            input: "string",
            output: "string",
          },
        },
      },
    },
  },
};

export default config;
