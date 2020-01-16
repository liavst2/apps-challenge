
import { Router } from "express";
import { appPanelRouter } from "./apps/app.routes";
import { staticRouter } from "./static/static.routes";

export const appRouter = Router();

appRouter.use(appPanelRouter);
appRouter.use(staticRouter);
