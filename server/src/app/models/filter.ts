
import { App } from "./app";

export abstract class AppFilter {
  protected abstract satisfies(app: App): boolean;
}
