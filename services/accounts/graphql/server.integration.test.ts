import { accountsEndpoint } from "dev-config";
import { fetch, waitForResources } from "server-config";
import { describe, expect, it } from "vitest-config";

describe("accounts server", () => {
  it(
    "returns user data",
    async () => {
      await waitForResources({
        resources: [accountsEndpoint],
        headers: {
          accept: "text/html",
        },
      });
      const response = await fetch(accountsEndpoint, {
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
    },
    {
      timeout: 30000,
    }
  );

  it("can sign in", async () => {
    const signInResponse = await fetch(accountsEndpoint, {
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
    const signedInUserResponse = await fetch(accountsEndpoint, {
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
