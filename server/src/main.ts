
import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";

import { appRouter } from "./app";


function main() {

  const httpPort = 9898;
  const app = express();
  const httpServer = http.createServer(app);

  configureApp(app);
  configureRoutes(app);

  httpServer.listen(httpPort);
}

/**
 * Here I will set the application with useful middlewares.
 * @param app - the application
 */
function configureApp(app: express.Express) {
  app.use(bodyParser.json());
}

/**
 * Here I will set the application routes.
 * @param app - the application
 */
function configureRoutes(app: express.Express) {
  app.use("/apps", appRouter);
  app.use((req, res) => {
    res.status(404).send({ msg: 'Unknown path: ' + req.path });
  });
}

main();

