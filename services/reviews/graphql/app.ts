import { YogaServerInstance, createYoga } from "graphql-config";
import { createReviewsSchema } from "./schema.js";
import { Context } from "./context.js";
import { createUseCases } from "../core/use-cases/index.js";
import { Ports } from "../core/ports/index.js";

export type ReviewsApp = YogaServerInstance<{}, Context>;

export function createReviewsApp(options: { ports: Ports }): ReviewsApp {
  const useCases = createUseCases({ ports: options.ports });
  return createYoga({
    context: () => {
      return {
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
