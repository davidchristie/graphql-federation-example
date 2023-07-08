import { Server, createServer } from "server-config";
import { createPrivateGatewaySchema } from "./private/schema.ts";
import { createPublicGatewaySchema } from "./public/schema.ts";
import { createPrivateGatewayApp } from "./private/app.ts";
import { createPublicGatewayApp } from "./public/app.ts";

export async function createGatewayServer(): Promise<Server> {
  const privateSchema = await createPrivateGatewaySchema();
  const privateApp = createPrivateGatewayApp(privateSchema);
  const publicSchema = createPublicGatewaySchema(privateSchema);
  const publicApp = createPublicGatewayApp(publicSchema);
  return createServer(publicApp, privateApp);
}
