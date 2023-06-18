import { SignedInUserQuery } from "../../../generated/graphql/graphql";

export type SignedInUser = Omit<
  NonNullable<Required<SignedInUserQuery>["signedInUser"]>,
  "__typename"
>;
