
import * as React from "react";
import { Header } from "./header";
import { Filters } from "./filters/filter-panel";
import { AppsList } from "./list/app-list";

export function AppsPanel() {

  return (
    <div className="app-panel">
      <Header/>
      <Filters/>
      <div className="column" style={{ maxHeight: 400 }}>
        <AppsList/>
      </div>
    </div>
  )

}
