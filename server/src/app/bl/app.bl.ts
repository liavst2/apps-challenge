
import { appData } from "../data/app.data";
import { AppQuery } from "../models/query";
import { FilterFactory } from "./filter-factory.bl";
import { AppFilter } from "../models/filters/filter";
import { App } from "../models/app";

/**
 * Handles the business logic of the controllers.
 * The main functionality goes here.
 */
export class AppBL {

  /**
   * How many filtered apps should return to the user.
   */
  private static readonly RANDOM_THRESHOLD = 3;

  /**
   * get the value range of the filters for selection
   */
  static getFiltersInfo() {
    return appData.getFiltersInfo();
  }

  /**
   * Get the relevant apps from the list accoding to the user's choice.
   * @param appQuery - the query built from the user selections
   */
  static getApps(appQuery: AppQuery) {
    const filters: AppFilter[] = FilterFactory.getFilters(appQuery);
    const apps: App[] = appData.getApps();
    // filtering the apps according to the filter list
    const filteredApps = this._filterApps(apps, filters);
    // choosing RANDOM_THRESHOLD in random
    const randomApps = this._chooseRandom(filteredApps);
    return randomApps;
  }

  /**
   * return only apps that all filters satisfy.
   * @param apps - the apps list
   * @param filters - the filter list
   */
  private static _filterApps(apps: App[], filters: AppFilter[]) {
    const filteredApps = apps.filter(app => filters.every(filter => filter.satisfies(app)));
    return filteredApps;
  }

  /**
   * choose RANDOM_THRESHOLD random apps from the filtered list.
   * @param filteredApps - the relevant apps
   */
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
