
import * as express from "express";
import * as http from "http";

import { appRouter } from "./app";

export class AppServer {

  readonly HTTP_PORT: number = 9898;
  httpServer: http.Server;
  app: express.Express;

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this._configureRoutes();
    this.listen();
  }

  get listening() {
    return this.httpServer.listening;
  }

  listen() {
    this.httpServer.listen(this.HTTP_PORT);
  }

  close() {
    this.httpServer.close();
  }

  /**
   * Here we set the application routes.
   */
  private _configureRoutes() {
    this.app.use("/apps", appRouter);
    this.app.use((req, res) => {
      res.status(404).send({ msg: 'Unknown path: ' + req.path });
    });
  }

}

export const appServer = new AppServer();

process.on("SIGTERM", () => {
  appServer.close();
  process.exit(0);
});
