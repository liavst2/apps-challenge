
import * as express from "express";
import * as http from "http";
import { Server } from "./server";



init();


function init() {

  const httpPort = 9898;
  
  const app = express();
  const httpServer = http.createServer(app);

  Server.bootstrap(httpServer, app);
  
  app.set("port", httpPort);
  httpServer.listen(httpPort);
}

