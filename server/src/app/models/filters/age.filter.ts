
import { AppFilter } from "./filter";
import { App } from "../app";

export class AgeFilter extends AppFilter {

  private _birthYear: number;

  constructor(birthYear: number) {
    super();
    this._birthYear = birthYear;
  }

  satisfies(app: App) {
    const age = (new Date().getFullYear() - this._birthYear);
    return app.min_age <= age;
  }
}
