
import { App } from "../app";

export abstract class AppFilter {
  abstract satisfies(app: App): boolean;
}
