import { type CodegenConfig } from "graphql-config";

const config: CodegenConfig = {
  schema: "../../services/gateway/generated/graphql/**/*.graphql",
  documents: "./graphql/operations/**/*.ts",
  generates: {
    "./generated/graphql/": {
      preset: "client",
      config: {
        documentMode: "string",
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
