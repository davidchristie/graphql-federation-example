import { Server, createServer } from "server-config";
import { createPrivateGatewaySchema } from "./private/schema.js";
import { createPublicGatewaySchema } from "./public/schema.js";
import { createPrivateGatewayApp } from "./private/app.js";
import { createPublicGatewayApp } from "./public/app.js";

export async function createGatewayServer(): Promise<Server> {
  const privateSchema = await createPrivateGatewaySchema();
  const privateApp = createPrivateGatewayApp(privateSchema);
  const publicSchema = createPublicGatewaySchema(privateSchema);
  const publicApp = createPublicGatewayApp(publicSchema);
  return createServer(publicApp, privateApp);
}
