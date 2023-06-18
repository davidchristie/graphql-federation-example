import { type CodegenConfig } from "graphql-config";

const config: CodegenConfig = {
  schema: "./graphql/type-defs.ts",
  generates: {
    "./generated/graphql/resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        mappers: {
          Product: "../../graphql/models/product.js#ProductModel",
          Review: "../../graphql/models/review.js#ReviewModel",
          User: "../../graphql/models/user.js#UserModel",
        },
      },
    },
  },
};

export default config;
