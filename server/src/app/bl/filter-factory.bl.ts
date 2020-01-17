import { AppQuery } from "../models/query";
import { AppFilter } from "../models/filters/filter";
import * as Filters from "../models/filters";


export class FilterFactory {

  static getFilters(appQuery: AppQuery): AppFilter[] {
    const filters: AppFilter[] = [];
    if (appQuery.rank) {
      filters.push(new Filters.RankFilter(appQuery.rank));
    }
    if (appQuery.categories) {
      filters.push(new Filters.CategoryFilter(appQuery.categories));
    }
    if (appQuery.year) {
      filters.push(new Filters.AgeFilter(appQuery.year));
    }
    return filters;
  }

}
