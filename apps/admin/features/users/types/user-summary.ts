import { UserSummaryFragment } from "../../../generated/graphql.ts";

export type UserSummary = Omit<UserSummaryFragment, "__typename">;
