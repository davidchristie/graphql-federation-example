import { SignedInUserFragment } from "../../../generated/graphql.ts";

export type SignedInUser = Omit<
  NonNullable<SignedInUserFragment["signedInUser"]>,
  "__typename"
>;
