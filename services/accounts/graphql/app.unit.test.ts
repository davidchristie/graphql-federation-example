import { beforeEach, describe, expect, it } from "vitest-config";
import { AccountsApp } from "./app.js";
import { createMockAccountsApp } from "../mocks/app.js";

describe("Accounts app", () => {
  let accountsApp: AccountsApp;

  beforeEach(async () => {
    accountsApp = createMockAccountsApp();
  });

  it("returns user data", async () => {
    const response = await accountsApp.fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          {
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
          "user": {
            "id": "2",
            "name": "Alan Turing",
            "username": "@complete",
          },
        },
      }
    `);
  });

  it("can sign in", async () => {
    const signInResponse = await accountsApp.fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation SignIn($input: SignInInput!) {
            signIn(input: $input) {
              token
              query {
                signedInUser {
                  id
                  name
                  username
                }
              }
            }
          }
        `,
        variables: {
          input: {
            email: "ada@email.com",
            password: "password123",
          },
        },
      }),
    });
    const signInResult = await signInResponse.json();
    expect(signInResult).toMatchObject({
      data: {
        signIn: {
          query: {
            signedInUser: {
              id: "1",
              name: "Ada Lovelace",
              username: "@ada",
            },
          },
          token: expect.any(String),
        },
      },
    });
    const signedInUserResponse = await accountsApp.fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${(signInResult as any).data.signIn.token}`,
      },
      body: JSON.stringify({
        query: `
          query SignedInUser {
            signedInUser {
              id
              name
              username
            }
          }
        `,
      }),
    });
    expect(await signedInUserResponse.json()).toMatchInlineSnapshot(`
      {
        "data": {
          "signedInUser": {
            "id": "1",
            "name": "Ada Lovelace",
            "username": "@ada",
          },
        },
      }
    `);
  });
});
