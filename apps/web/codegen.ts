import { type CodegenConfig } from "graphql-config";

const config: CodegenConfig = {
  schema: "../../services/gateway/generated/graphql/**/*.graphql",
  documents: "./operations/**/*.ts",
  generates: {
    "./generated/graphql/": {
      preset: "client",
      config: {
        documentMode: "string",
      },
    },
  },
};

export default config;
