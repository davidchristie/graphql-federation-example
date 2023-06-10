import { YogaServerInstance } from "graphql-config";
import { beforeEach, describe, expect, it } from "vitest-config";
import { createAccountsApp } from "./app.js";

describe("Accounts app", () => {
  let accountApp: YogaServerInstance<{}, {}>;

  beforeEach(async () => {
    accountApp = createAccountsApp();
  });

  it("returns the correct response", async () => {
    const response = await accountApp.fetch("/graphql", {
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
  });
});
