import * as path from "path";

var os = require("os");
var ifaces = os.networkInterfaces();

export function sessionIdChecker(req, res, next) {
  if (req.session) {
    const clientId = getIp(req);
    if (!req.session.clientId) {
      req.session.clientId = clientId;
    } else if (req.session.clientId !== clientId) {
      console.warn(
        `[sessionIdChecker] Detect a session with a different client id. Previous ID is '${
        req.session.clientId
        }', new ID is  '${clientId}'`
      );
      if (req["session"]) {
        req["session"].destroy(function (err) {
          res.redirect('/icen/authen'); //Inside a callback… bulletproof!
        });
      }
      return;
    }
  }
  next();
}

let serverIp = getServerIp();

export function getIp(req) {
  let ip =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip;
  if (ip.indexOf("::") > -1) {
    if (!serverIp) {
      serverIp = getServerIp();
    }
    ip = serverIp || "127.0.0.1";
  }
  return ip;
}


export function getServerIp() {
  let ip;
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ("IPv4" !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        ip = iface.address;
        // console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        ip = iface.address;
      }
      ++alias;
    });
  });
  if (ip) return ip;
}
