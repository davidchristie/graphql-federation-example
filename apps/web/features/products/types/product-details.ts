import { ProductDetailsFragment } from "../../../generated/graphql";

export type ProductDetails = Omit<ProductDetailsFragment, "__typename">;
