import { accountsEndpoint, seedUsers } from "dev-config";
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
    const signedInUserResponse = await fetch(accountsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            "id": "89bd9d8d-69a6-474e-80f4-67cc8796ed15",
            "name": "User",
            "username": "user",
          },
        },
      }
    `);
  });
});
