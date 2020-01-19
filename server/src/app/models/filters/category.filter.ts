
import { AppFilter } from "./filter";
import { App } from "../app";

export class CategoryFilter extends AppFilter {

  private _categories: object;

  constructor(categories: string[]) {
    super();
    this._categories = {};
    for (let i = 0; i < categories.length; ++i) {
      this._categories[categories[i]] = 1;
    }
  }

  satisfies(app: App) {
    return !!this._categories[app.category];
  }
}
