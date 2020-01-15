import * as session from "express-session";


export const cookieName = "connect.icen"

export const sessionMiddleware = session({
  saveUninitialized: false,
  unset: "destroy",
  secret: "tHiSiSasEcRetStr",
  resave: false,
  rolling: true,
  cookie: { maxAge: 1 * 3600000 },
  name: cookieName,
  // TODO -this is the wrong way to do this.... need to find a way to initiate the memory store by myself, and only than to load it to the session middlware.
  // then. we will not need to init the sessionStoreMem object
  //   store: sessionManager,
  path: "/icen"
}); 