import { graphql } from "../../../generated/graphql";

export const ProductSummaryFragment = graphql(/* GraphQL */ `
  fragment ProductSummary on Product {
    upc
    name
    price
    weight
    imageUrl
    isNew
    inStock
    shippingEstimate
    totalReviews
    averageRating
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
