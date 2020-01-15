
import { AppFilter } from "../filter";
import { App } from "../app";

export class CategoryFilter extends AppFilter {

  satisfies(app: App) {
    return true;
  }
}