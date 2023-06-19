import { SignedInUserFragment } from "../../../generated/graphql";

export type SignedInUser = Omit<
  NonNullable<SignedInUserFragment["signedInUser"]>,
  "__typename"
>;
