import { App } from "../models/app";

/**
 * Holds the value range of the filters and the apps list.
 * If a database is used, the fetching logic will be defined here.
 */
class AppData {

  // can be configurable if needed
  readonly YEAR_START = 1960;
  readonly YEAR_COUNT = 50;

  readonly RANK_START = 1;
  readonly RANK_COUNT = 5;

  apps: App[];
  categories: string[];
  years: number[];
  ranks: number[];

  constructor() {
    this.apps = require("./apps.json");
    this.categories = require("./categories.json");
    this.years = [...Array(this.YEAR_COUNT).keys()].map(i => i + this.YEAR_START);
    this.ranks = [...Array(this.RANK_COUNT).keys()].map(i => i + this.RANK_START);
  }

  getApps() {
    return this.apps;
  }

  getFiltersInfo() {
    return {
      categories: this.categories,
      years: this.years,
      ranks: this.ranks
    }
  }

}

export const appData = new AppData();
