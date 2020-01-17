
import * as React from "react";
import { Header } from "./header";
import { Filters } from "./filters/filters";
import { AppsList } from "./app-list";

export function AppsPanel() {

  return (
    <div className="app-panel">
      <Header/>
      <Filters/>
      <div>
        <AppsList/>
      </div>
    </div>
  )

}
