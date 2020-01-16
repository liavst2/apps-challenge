
import * as React from "react";
import { Header } from "./header";
import { Filters } from "./filters/filters";

export function AppsPanel() {

  return (
    <div className="app-panel">
      <Header/>
      <Filters/>
    </div>
  )

}
