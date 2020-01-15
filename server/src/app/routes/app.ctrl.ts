
import { Request, Response } from "express";
import { AppBL } from "../bl/app.bl";

export class appCtrl {

  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await AppBL.getCategories();
      res.status(200).send(categories);
    } catch (err) {
      console.error(err);
      res.status(500).send("Could not fetch categories");
    }
  }

  static getApps(req: Request, res: Response) {

  }

}