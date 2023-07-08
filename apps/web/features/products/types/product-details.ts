import { ProductDetailsFragment } from "../../../generated/graphql.ts";

export type ProductDetails = Omit<ProductDetailsFragment, "__typename">;
