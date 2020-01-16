
import axios from "axios";

const BASE_PATH = process.env.PUBLIC_URL;

export class AppsAPI {

  static getCategories() {
    const req = {
      url: `${BASE_PATH}/categories`,
      method: "get"
    }

    return axios(req);
  }

  static getApps() {
    const req = {
      url: `${BASE_PATH}/categories`,
      method: "get"
    }

    return axios(req);
  }

}