import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./type-defs.ts",
  generates: {
    "./generated/graphql/resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
