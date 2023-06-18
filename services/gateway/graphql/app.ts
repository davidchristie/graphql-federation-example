import { GraphQLSchema, YogaServerInstance, createYoga } from "graphql-config";
import { Context } from "./context.js";

export function createGatewayApp(
  schema: GraphQLSchema | Promise<GraphQLSchema>
): YogaServerInstance<Context, {}> {
  return createYoga({
    schema,
    context: ({ request }) => {
      const authHeader = request.headers.get("Authorization");
      return { authHeader };
    },
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
