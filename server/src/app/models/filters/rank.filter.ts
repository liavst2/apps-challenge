
import { AppFilter } from "./filter";
import { App } from "../app";

export class RankFilter extends AppFilter {

  private _rank: number;

  constructor(rank: number) {
    super();
    this._rank = rank;
  }

  satisfies(app: App) {
    return app.rating >= this._rank;
  }
}
