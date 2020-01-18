
import axios from "axios";

const BASE_PATH = process.env.PUBLIC_URL;

/**
 * This is the bridge to the server side
 */
export class AppsAPI {

  static async getFilterInfo() {
    const req = {
      url: `${BASE_PATH}/filter-info`,
      method: "get"
    }
    const res = await axios(req);
    return res.data;
  }

  static async getApps(query: string) {
    const req = {
      url: `${BASE_PATH}/items?${query}`,
      method: "get"
    }

    const res = await axios(req);
    return res.data;
  }

}