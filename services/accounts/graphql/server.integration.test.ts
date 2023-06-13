import { gatewayHost } from "dev-config";
import { fetch, waitForResources } from "server-config";
import { describe, expect, it } from "vitest-config";

describe("Accounts server", () => {
  it(
    "returns the correct response",
    async () => {
      await waitForResources({
        resources: [gatewayHost],
        headers: {
          accept: "text/html",
        },
      });
      const response = await fetch(`${gatewayHost}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            {
              me {
                id
                name
                username
              }
              user(id: "2") {
                id
                name
                username
              }
            }
          `,
        }),
      });
      const result = await response.json();
      expect(result).toMatchInlineSnapshot(`
        {
          "data": {
            "me": {
              "id": "1",
              "name": "Ada Lovelace",
              "username": "@ada",
            },
            "user": {
              "id": "2",
              "name": "Alan Turing",
              "username": "@complete",
            },
          },
        }
      `);
    },
    {
      timeout: 10000,
    }
  );
});
