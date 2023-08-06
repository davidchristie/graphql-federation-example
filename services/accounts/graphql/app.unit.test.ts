import { seedUsers } from "dev-config";
import { beforeEach, describe, expect, it } from "vitest-config";
import { AccountsApp } from "./app.ts";
import { createMockAccountsApp } from "../mocks/app.ts";

describe("accounts app", () => {
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
            user(id: "${seedUsers[0].id}") {
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
            "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
            "name": "User",
            "username": "user",
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
            email: seedUsers[0].email,
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
              id: seedUsers[0].id,
              name: seedUsers[0].name,
              username: seedUsers[0].username,
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
        authorization: `Bearer ${signInResult.data.signIn.token}`,
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
            "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
            "name": "User",
            "username": "user",
          },
        },
      }
    `);
  });
});
