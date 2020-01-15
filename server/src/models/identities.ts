class IdentityBL {
    /* API Key identity */
    setIdentityAPIKey(req, certificate) {
      req["scope"] = certificate.scope;
      req["entity"] = certificate.name;
    }
  
    /* user session (browser) identity */
    setIdentityUserSession(req) {
      if (req["user"]) {
        let user = req["user"];
        req["scope"] = user.user.role;
        req["entity"] = user.user.username;
      } else {
        req["scope"] = undefined;
      }
    }
  
    getScope(req) {
      return req["scope"];
    }
  
    getEntity(req) {
      return req["entity"];
    }
  }
  
  export const identityBL = new IdentityBL();
  