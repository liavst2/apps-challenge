
import { Dispatcher } from "@storex/core";
import { AppsAPI } from "../api/apps.api";

class FilterStore extends Dispatcher {

  // arbitrarily between 1960 - 2009
  readonly birthYears: number[] = [...Array(50).keys()].map(i => i + 1960);
  // between 1 - 5
  readonly ranks: number[] = [...Array(5).keys()].map(i => i + 1);
  categories: string[];

  appList = [];

  constructor() {
    super();
    this.init();
  }

  async init() {
    this.categories = (await AppsAPI.getCategories()).data;
    this.dispatch();
  }

  async searchApps(filters) {
    if (!this._validateFilters(filters)) {
      return;
    }
    const query = new URLSearchParams(filters).toString();
    this.appList = (await AppsAPI.getApps(query)).data;
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
