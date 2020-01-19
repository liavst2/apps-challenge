
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "../app/App";
import { filterStore } from "../app/storage/filter.store";
import * as Mocks from "./filters.mock";
import "jest";

describe("The application", () => {

  test("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

})

describe("Filter store", () => {

  let jsdomAlert = null;

  beforeAll(() => {
    jsdomAlert = window.alert;
    window.alert = () => {};
  })

  afterAll(() => {
    window.alert = jsdomAlert;
  })

  test("Test missing year filter", async () => {
    await filterStore.searchApps(Mocks.missingYearFilter);
    expect(filterStore.appList).toHaveLength(0);
  })

  test("Test missing rank filter", async () => {
    await filterStore.searchApps(Mocks.missingRankFilter);
    expect(filterStore.appList).toHaveLength(0);
  })

  test("Test missing categories filter", async () => {
    await filterStore.searchApps(Mocks.missingCategoriesFilter);
    expect(filterStore.appList).toHaveLength(0);
  })

})
