import { graphql } from "../../../generated/graphql";

export const ProductSummaryFragment = graphql(/* GraphQL */ `
  fragment ProductSummary on Product {
    upc
    name
    price
    weight
    inStock
    shippingEstimate
    reviews {
      id
      body
      author {
        name
        username
        totalReviews
      }
    }
  }
`);
