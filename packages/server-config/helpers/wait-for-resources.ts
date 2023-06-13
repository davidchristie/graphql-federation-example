import fetch from "node-fetch";

export async function waitForResources(input: {
  resources: string[];
  headers?: Record<string, string>;
}): Promise<void> {
  await Promise.all(
    input.resources.map((resource) =>
      waitForResource(resource, {
        headers: input.headers,
      })
    )
  );
}

async function waitForResource(
  resource: string,
  options: {
    headers?: Record<string, string>;
  }
): Promise<void> {
  console.log(`Checking connection to ${resource}`);
  const maxRetries = 30;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(resource, {
        headers: options.headers,
      });
      if (response.ok) {
        console.log(`Connected to ${resource}`);
        return;
      }
    } catch (error) {}
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error("Unable to connect to " + resource);
}
