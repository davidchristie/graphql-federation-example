import { getAuthHeader } from "auth-config";
import { GraphQLSchema, YogaServerInstance, createYoga } from "graphql-config";
import { Context } from "../context.ts";

export type PublicGatewayApp = YogaServerInstance<
  Record<string, unknown>,
  Context
>;

export function createPublicGatewayApp(
  schema: GraphQLSchema
): PublicGatewayApp {
  return createYoga<Record<string, unknown>, Context>({
    schema,
    context: ({ request }) => {
      const authHeader = getAuthHeader({ request });
      return { authHeader };
    },
    landingPage: false,
    graphqlEndpoint: "/public/graphql",
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
