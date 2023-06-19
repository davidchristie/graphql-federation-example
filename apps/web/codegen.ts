import { type CodegenConfig } from "graphql-config";

const config: CodegenConfig = {
  schema: "../../services/gateway/generated/graphql/**/*.graphql",
  documents: "./**/*.graphql",
  generates: {
    "./generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
