
import { Router } from "express";
import { AppCtrl } from "./app.ctrl";

export const appRouter = Router();

appRouter.route("/categories")
  .get(AppCtrl.getCategories)

appRouter.route("/items")
  .get(AppCtrl.getApps)
