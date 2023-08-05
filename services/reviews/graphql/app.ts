import { getAuthHeader, getSignedInUser, getToken } from "auth-config";
import { YogaServerInstance, createYoga } from "graphql-config";
import { createReviewsSchema } from "./schema.ts";
import { Context } from "./context.ts";
import { createUseCases } from "../core/use-cases/index.ts";
import { Ports } from "../core/ports/index.ts";

export type ReviewsApp = YogaServerInstance<Record<string, unknown>, Context>;

export function createReviewsApp(options: {
  ports: Ports;
  auth: {
    publicKeyOrSecret: string;
  };
}): ReviewsApp {
  const useCases = createUseCases({ ports: options.ports });
  return createYoga({
    context: ({ request }) => {
      const authHeader = getAuthHeader({ request });
      const token = getToken({ authHeader });
      const signedInUser = getSignedInUser({
        token,
        publicKeyOrSecret: options.auth.publicKeyOrSecret,
      });
      return {
        signedInUser,
        useCases,
      };
    },
    schema: createReviewsSchema(),
    landingPage: false,
    graphiql: {
      title: "Reviews",
      defaultQuery: `
{
  review(id: 1) {
    id
    body
    rating
    author {
      id
    }
    product {
      upc
    }
  }
}
      `.trim(),
    },
  });
}
