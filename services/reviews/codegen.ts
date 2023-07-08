import { type CodegenConfig } from "graphql-config";

const config: CodegenConfig = {
  schema: "./graphql/type-defs.ts",
  generates: {
    "./generated/graphql/resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../../graphql/context.ts#Context",
        mapperTypeSuffix: "Model",
        mappers: {
          Product: "../../graphql/models/product.ts#Product",
          Review: "../../graphql/models/review.ts#Review",
          User: "../../graphql/models/user.ts#User",
        },
      },
    },
  },
};

export default config;
