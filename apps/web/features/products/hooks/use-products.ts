import { productsQuery } from "../../../graphql/operations/queries/products";
import {
  UseGraphQLQueryResult,
  useGraphQLQuery,
} from "../../../graphql/use-graphql-query";
import { ProductSummary } from "../types/product-summary";

export function useProducts(): UseGraphQLQueryResult<ProductSummary[]> {
  const result = useGraphQLQuery(productsQuery);
  const products = result.data?.products.flatMap((product) =>
    product === null ? [] : [product]
  );
  return {
    ...result,
    data: products,
  } as UseGraphQLQueryResult<ProductSummary[]>;
}
