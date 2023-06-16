import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./graphql/type-defs.ts",
  generates: {
    "./generated/graphql/resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        mappers: {
          Product: "../../graphql/models/product.js#ProductModel",
        },
      },
    },
  },
};

export default config;
