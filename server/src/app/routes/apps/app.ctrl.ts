
import { Request, Response } from "express";
import { AppBL } from "../../bl/app.bl";
import { AppQuery } from "../../models/query";

export class AppPanelCtrl {

  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await AppBL.getCategories();
      res.status(200).send(categories);
    } catch (err) {
      console.error(err);
      res.status(500).send("Could not fetch categories");
    }
  }

  static async getApps(req: Request, res: Response) {
    const appQuery = new AppQuery(req.query);
    if (!appQuery.isValid()) {
      return res.status(400).send("Bad query format!");
    }
    try {
      const topApps = await AppBL.getApps(appQuery);
      res.status(200).send(topApps);
    } catch (err) {
      console.error(err);
      res.status(500).send("Could not fetch applications");
    }
  }

}
