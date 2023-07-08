import { ProductSummaryFragment } from "../../../generated/graphql.ts";

export type ProductSummary = Omit<ProductSummaryFragment, "__typename">;
