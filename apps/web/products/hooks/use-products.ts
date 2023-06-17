import { ProductsQuery } from "../../generated/graphql/graphql";
import { productsQuery } from "../../graphql/operations/queries/products";
import {
  UseGraphQLQueryResult,
  useGraphQLQuery,
} from "../../graphql/use-graphql-query";

export function useProducts(): UseGraphQLQueryResult<ProductsQuery> {
  return useGraphQLQuery(productsQuery);
}
