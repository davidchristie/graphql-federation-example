import { GraphQLSchema, YogaServerInstance, createYoga } from "graphql-config";

export function createGatewayApp(
  schema: GraphQLSchema | Promise<GraphQLSchema>
): YogaServerInstance<{}, {}> {
  return createYoga({
    schema,
    maskedErrors: false,
    graphiql: {
      title: "Gateway",
      defaultQuery: `
{
  products(upcs: [1, 2]) {
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
      rating
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
      `.trim(),
    },
  });
}
