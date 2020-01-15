
import { Router } from "express";
import { appCtrl } from "./app.ctrl";

export const appRouter = Router();

appRouter.route("/categories")
  .get(appCtrl.getCategories)