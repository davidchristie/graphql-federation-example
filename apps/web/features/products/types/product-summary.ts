import { ProductSummaryFragment } from "../../../generated/graphql";

export type ProductSummary = Omit<ProductSummaryFragment, "__typename">;
