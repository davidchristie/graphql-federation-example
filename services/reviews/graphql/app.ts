import { YogaServerInstance, createYoga } from "graphql-config";
import { createReviewsSchema } from "./schema.ts";
import { Context } from "./context.ts";
import { createUseCases } from "../core/use-cases/index.ts";
import { Ports } from "../core/ports/index.ts";

export type ReviewsApp = YogaServerInstance<Record<string, unknown>, Context>;

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
