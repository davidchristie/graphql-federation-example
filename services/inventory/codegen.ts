import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./graphql/type-defs.ts",
  generates: {
    "./generated/graphql/resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../../graphql/context.ts#Context",
        mappers: {
          Product: "../../graphql/models/product.ts#Product",
        },
        mapperTypeSuffix: "Model",
      },
    },
  },
};

export default config;
