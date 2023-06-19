import { type CodegenConfig } from "graphql-config";

const config: CodegenConfig = {
  schema: "./graphql/type-defs.ts",
  generates: {
    "./generated/graphql/resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../../graphql/context.js#Context",
        mapperTypeSuffix: "Model",
        mappers: {
          SignInPayload:
            "../../graphql/models/sign-in-payload.js#SignInPayload",
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
