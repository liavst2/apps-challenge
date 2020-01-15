import * as path from "path";
import { Router, Application } from "express";

import { Middlewares } from "./models/middlewares";
import { LicenseRouter } from "./routes/license-manager/license.router";
import { AuthRouter } from "./routes/auth/auth.router";
import { StaticRouter } from "./routes/static/static.router";
import { ActivityRouter } from "./routes/icen-activity/icen-activity.route";
import { EntityRouter } from "./routes/icen-entity-manager/icen-entity-manager.router";
import { GeocoderRouter } from "./routes/icen-geocoder/icen-geocoder.route"
import { userManagementRouter } from "./routes/icen-users-manager/user-management.router";
import { DocRouter } from "./routes/docs/docs.route";
import { LanguageRouter } from "./routes/language/language.router";
import { storageRouter } from "./routes/storage/storage.router";
import { OperatorRouter } from "./routes/icen-operator/icen-operator.route";
import { netdataRouter } from "./routes/netdata/router/netdata.router";
import { AuthCtrl } from "./routes/auth/auth.ctrl";

export function configServerRouting(app: Application) {
  const icenRouter = Router();
  icenRouter.use(AuthRouter);
  icenRouter.use(StaticRouter);
  icenRouter.use(AuthCtrl.isAllowed)
  icenRouter.use(Middlewares.responseBody);
  icenRouter.use("/operator", OperatorRouter);
  icenRouter.use("/entity", EntityRouter);
  icenRouter.use("/activity", ActivityRouter);
  icenRouter.use("/license", LicenseRouter);
  icenRouter.use("/geocoder", GeocoderRouter);
  icenRouter.use("/users", userManagementRouter);
  icenRouter.use("/language", LanguageRouter);
  icenRouter.use("/storage", storageRouter);
  icenRouter.use("/docs", DocRouter);
  icenRouter.use("/netdata", netdataRouter);

  app.use("/icen", icenRouter);

  app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../../client/index.html"));
  });
}
