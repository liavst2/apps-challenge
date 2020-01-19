
import { Dispatcher } from "@storex/core";
import { AppsAPI } from "../api/apps.api";

/**
 * Saves info about the filters.
 * Dispatches changes when needed.
 */
class FilterStore extends Dispatcher {

  categories: string[];
  years: number[];
  ranks: number[];

  appList = [];
  searchEmpty: boolean = false;

  constructor() {
    super();
    this.init();
  }

  async init() {
    const filterInfo = await AppsAPI.getFilterInfo();
    Object.assign(this, filterInfo);
    this.dispatch();
  }

  async searchApps(filters) {
    if (!this._validateFilters(filters)) {
      return;
    }
    const query = new URLSearchParams(filters).toString();
    this.appList = await AppsAPI.getApps(query);
    this.searchEmpty = !(this.appList || []).length;
    this.dispatch();
  }
  
  private _validateFilters(filters) {
    if (!filters["year"] || !filters["rank"] || !filters["categories"]) {
      alert("Not all filter fields were set!");
      return false;
    }
    if (filters["categories"].length > 3) {
      alert("You chose more than 3 categories!");
      return false;
    }
    return true;
  }

}

export const filterStore = new FilterStore();
