import { DocumentNode, GraphQLError } from "graphql";

export function convertDocumentToString(document: DocumentNode): string {
  const body = document.loc?.source.body;
  if (body === undefined) {
    throw new GraphQLError("Type defs body not found");
  }
  return body;
}
