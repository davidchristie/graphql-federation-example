import { ReviewSummaryFragment } from "../../../generated/graphql.ts";

export type ReviewSummary = Omit<ReviewSummaryFragment, "__typename">;
