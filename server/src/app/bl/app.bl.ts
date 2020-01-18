
import { appData } from "../data/app.data";
import { AppQuery } from "../models/query";
import { FilterFactory } from "./filter-factory.bl";
import { AppFilter } from "../models/filters/filter";
import { App } from "../models/app";

export class AppBL {

  private static readonly RANDOM_THRESHOLD = 3;

  static getFiltersInfo() {
    return appData.getFiltersInfo();
  }

  static getApps(appQuery: AppQuery) {
    const filters: AppFilter[] = FilterFactory.getFilters(appQuery);
    const apps: App[] = appData.getApps();
    // filtering the apps according to the filter list
    const filteredApps = this._filterApps(apps, filters);
    // choosing RANDOM_THRESHOLD in random
    const randomApps = this._chooseRandom(filteredApps);
    return randomApps;
  }

  private static _filterApps(apps: App[], filters: AppFilter[]) {
    // return apps that all filters satisfy
    const filteredApps = apps.filter(app => filters.every(filter => filter.satisfies(app)));
    return filteredApps;
  }

  private static _chooseRandom(filteredApps: App[]) {
    if (filteredApps.length <= this.RANDOM_THRESHOLD) {
      return filteredApps;
    }
    const randomApps = [];
    // choosing RANDOM_THRESHOLD apps from the list
    for (let i = this.RANDOM_THRESHOLD; i--;) {
      const randomIndex = Math.floor(Math.random() * (filteredApps.length - 1));
      randomApps.push(filteredApps[randomIndex]);
      filteredApps.splice(randomIndex, 1);
    }
    return randomApps;
  }

}
