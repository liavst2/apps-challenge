
import { Router } from "express";
import { AppPanelCtrl } from "./app.ctrl";

export const appPanelRouter = Router();

appPanelRouter.route("/categories")
  .get(AppPanelCtrl.getCategories)

appPanelRouter.route("/items")
  .get(AppPanelCtrl.getApps)
