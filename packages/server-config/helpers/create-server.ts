import express, { Express } from "express";
import expressWinston from "express-winston";
import { YogaServerInstance } from "graphql-config";
import winston from "winston";

export type Server = Express;

export function createServer<TUserContext extends Record<string, any>>(
  ...apps: YogaServerInstance<{}, TUserContext>[]
) {
  const server = express();
  server.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
    })
  );
  apps.forEach((app) => {
    server.use(app.graphqlEndpoint, app);
  });
  return server;
}
