
import * as React from "react";
import { Subscribe } from "@storex/react";
import { AppCard } from "./app-card";
import { filterStore } from "../../storage/filter.store";

export function AppsList() {
  return (
    <Subscribe to={filterStore}>
      {() => {
        const { appList, searchEmpty } = filterStore;
        if (!!appList.length) {
          return <>
            <div className="header">
              Your recommended Apps:
            </div>
            <div className="app-list">
              {appList.map(app => <AppCard key={app.id} app={app} />)}
            </div>
          </>
        }
        if (searchEmpty) {
          return (
            <div className="header">
              {"Could not find applications that match your search :("}
            </div>
          );
        }
        return null;
      }}
    </Subscribe>
  )
}


