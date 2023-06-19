import { type CodegenConfig } from "graphql-config";

const config: CodegenConfig = {
  schema: "./graphql/type-defs.ts",
  generates: {
    "./generated/graphql/resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        mapperTypeSuffix: "Model",
        mappers: {
          Product: "../../graphql/models/product.js#Product",
          Review: "../../graphql/models/review.js#Review",
          User: "../../graphql/models/user.js#User",
        },
      },
    },
  },
};

export default config;
