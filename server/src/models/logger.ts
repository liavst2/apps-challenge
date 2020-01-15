
import axios from "axios";
import { IdentityCtrl } from "../routes/identities/identities.ctrl";
const icenActivityURL = require('../config.json')["services"]["icen_activity"];

export namespace Logger {

	export function success(log) {
		_pushLog({ error: false, ..._buildLog(log) });
	}
	
	export function failure(log) { 
		_pushLog({ error: true, ..._buildLog(log) });
	}

	function _buildLog(log) {
		const { request: r, ...others } = log;
		const { scope = "", entity = "" } = r;
		const ip = r.ip == "::1" ? "127.0.0.1": r.ip;
		return { user: entity, role: scope, ip, ...others };
	}

	function getUser(req) {
		let entity = IdentityCtrl.getEntity(req)
		return entity || "UNKNOWN"
	
	}
	
	function getUserType(req) {
	   let scope = IdentityCtrl.getScope(req)
	   return scope || "UNKNOWN"
	}

	export async function _pushLog(log) {
		if (!log.action) {
			return;
		}
		const req = {
			method: "post",
			url: `${icenActivityURL}/logs`,
			data: log
		}
		try {
			await axios.request(req);
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

}

