import { graphql } from "../../../generated/graphql";

export const productsQuery = graphql(/* GraphQL */ `
  query Products {
    products(upcs: [1, 2, 3]) {
      ...ProductSummary
    }
  }
`);
