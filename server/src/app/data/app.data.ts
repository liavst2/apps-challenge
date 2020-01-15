
const apps = require("./apps.json");
const categories = require("./categories.json");

export class AppData {

  static getCategories() {
    return categories;
  }

  static getApps() {
    return apps;
  }

}

