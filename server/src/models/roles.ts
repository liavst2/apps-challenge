import { Request, Response } from "express";
import { IdentityCtrl } from "../routes/identities/identities.ctrl";

export class RoleManager {
  roles: any;

  constructor(roles_actions_obj: any) {
    if (this.validate_role_actions_obj(roles_actions_obj)) {
      this.roles = roles_actions_obj;
    } else {
      const err = "wrong roles-action object";
      console.error(err);
      throw new Error(err);
    }
  }

  validate_role_actions_obj(_o: any) {
    // todo
    return true;
  }

  checkRequestActionAuthorization(actionLog, req): boolean {
    const username = IdentityCtrl.getEntity(req)
    const user_role = IdentityCtrl.getScope(req)
    const feature_user_conf = this.roles[user_role];
    const allowed_actions_array = feature_user_conf.allowedActions;
    const allowed_feature = feature_user_conf.isAllowed;
    let action;
    if (actionLog) {
      action = actionLog["action"];
    }
    // check that user is allowed for this feature
    if (!allowed_feature) {
      const errorSTR =
        "Feature is not allowed for user " +
        username +
        " with role " +
        user_role;
      console.error(errorSTR);
      return false;
    }
    // check if current action is listed at the user's role accepted action
    if (action && !allowed_actions_array.includes(action)) {
      const errorSTR =
        "action <" +
        action +
        "> is not allow for user " +
        username +
        " with role " +
        user_role;
      console.log(errorSTR);
      return false;
    }
    return true;
  }
}
