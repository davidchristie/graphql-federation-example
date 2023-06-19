import { YogaServerInstance, createYoga } from "graphql-config";
import { createReviewsSchema } from "./schema.js";

export type ReviewsApp = YogaServerInstance<{}, {}>;

export function createReviewsApp(): ReviewsApp {
  return createYoga({
    schema: createReviewsSchema(),
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
