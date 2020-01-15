import { authBL } from "./../../engines/auth/auth.bl";

export namespace AuthenticationLogic {

  export function serializeUser(user, done) {
    done(null, user);
  }
  
  export function deserializeUser(user, done) {
    done(null, user);
  }

  export async function authenticate(token, done) {
    const session = await authBL.requestSessionFromAuthService(token);

    try {
      if (session) {
        return done(null, session);
      } else {
        return done(null, false, { message: "User not found." }); 
      }
    } catch (e) {
      return done(null, false, { message: "User not found." });
    }
  }

}

