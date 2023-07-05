import { GraphQLSchema, filterSchema, pruneSchema } from "graphql-config";

export function createPublicGatewaySchema(
  privateSchema: GraphQLSchema
): GraphQLSchema {
  return pruneSchema(
    filterSchema({
      schema: privateSchema,
      rootFieldFilter: (_type, fieldName) => !fieldName.startsWith("_"),
      fieldFilter: (_type, fieldName) => !fieldName.startsWith("_"),
      argumentFilter: (_typeName, _fieldName, argName) =>
        !argName?.startsWith("_"),
    })
  );
}
