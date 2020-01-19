import { AppQuery } from "../models/query";
import { AppFilter } from "../models/filters/filter";
import * as Filters from "../models/filters";

/**
 * I used a factory pattern to initialize the filters, according to query structure
 */
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
