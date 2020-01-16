
import { Dispatcher } from "@storex/core";
import { AppsAPI } from "../api/apps.api";

class FilterStore extends Dispatcher {

  // arbitrarily between 1960 - 2009
  readonly birthYears: number[] = [...Array(50).keys()].map(i => i + 1960);
  // between 1 - 5
  readonly ranks: number[] = [...Array(5).keys()].map(i => i + 1);
  categories: string[];

  constructor() {
    super();
    this.init();
  }

  async init() {
    this.categories = (await AppsAPI.getCategories()).data;
    this.dispatch();
  }

}

export const filterStore = new FilterStore();
