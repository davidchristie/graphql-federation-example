import { Server } from "./create-server";

export async function startServer(
  server: Server,
  port: string | number
): Promise<void> {
  await new Promise<void>((resolve) => server.listen(port, resolve));
  console.log(`Server running on port ${port}`);
}
