
import * as path from "path";
import { Router, static as serveStatic } from "express";

export const staticRouter = Router();

staticRouter.use(serveStatic(path.join(__dirname, "../../client/build")));
