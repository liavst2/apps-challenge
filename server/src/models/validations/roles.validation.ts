
export namespace Authorizations {

  export function isAuthorized(action: string, authorities: any, _scope: any, _entity:any) {
    try {
      // check that user is allowed for this feature
      if(!authorities.isAllowed){
        const errorSTR = `Feature is not allowed for user ${_entity} with role ${_scope}`;
        console.error(errorSTR);
        throw new Error(errorSTR)
      }
      // check if current action is listed at the user's role accepted action
      if ( action && !authorities.allowedActions.includes(action)) {
        const errorSTR = `action <${action}> is not allowed for user ${_entity} with role ${_scope}`;
        console.error(errorSTR);
        throw new Error(errorSTR)
      }
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

}