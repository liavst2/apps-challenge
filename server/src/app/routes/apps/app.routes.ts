
import { Router } from "express";
import { AppPanelCtrl } from "./app.ctrl";

export const appPanelRouter = Router();

appPanelRouter.route("/filter-info")
  .get(AppPanelCtrl.getFlterInfo)

appPanelRouter.route("/items")
  .get(AppPanelCtrl.getApps)
