
import { AppFilter } from "./filter";
import { App } from "../app";

export class CategoryFilter extends AppFilter {

  private _categories: string[];

  constructor(categories: string[]) {
    super();
    this._categories = categories;
  }

  satisfies(app: App) {
    return this._categories.includes(app.category);
  }
}
