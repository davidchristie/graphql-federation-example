import { getAuthHeader } from "auth-config";
import { GraphQLSchema, YogaServerInstance, createYoga } from "graphql-config";
import { Context } from "./context.js";
import { createPublicGatewaySchema } from "./schema.js";

export type GatewayApp = YogaServerInstance<Context, {}>;

export function createGatewayApp(privateSchema: GraphQLSchema): GatewayApp {
  const publicSchema = createPublicGatewaySchema(privateSchema);
  return createYoga({
    schema: publicSchema,
    context: ({ request }) => {
      const authHeader = getAuthHeader({ request });
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
