import { graphql } from "../../generated/graphql";

export const productsQueryDocument = graphql(/* GraphQL */ `
  query Products {
    products(upcs: [1, 2]) {
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
        product {
          name
          price
        }
      }
    }
  }
`);
