import { getAuthHeader } from "auth-config";
import { GraphQLSchema, YogaServerInstance, createYoga } from "graphql-config";
import { Context } from "../context.ts";

export type PrivateGatewayApp = YogaServerInstance<
  Record<string, unknown>,
  Context
>;

export function createPrivateGatewayApp(
  schema: GraphQLSchema
): PrivateGatewayApp {
  return createYoga<Record<string, unknown>, Context>({
    schema,
    context: ({ request }) => {
      const authHeader = getAuthHeader({ request });
      return { authHeader };
    },
    landingPage: false,
    graphqlEndpoint: "/private/graphql",
    graphiql: {
      title: "Admin",
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
