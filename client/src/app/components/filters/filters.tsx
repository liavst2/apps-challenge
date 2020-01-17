
import * as React from "react";

import { RankFilter } from "./rank-filter";
import { CategoryFilter } from "./category-filter";
import { AgeFilter } from "./age-filter";

import { filterStore } from "../../storage/filter.store";
import { Button } from "@material-ui/core";

export function Filters() {

  const filters = {};
  const handleFilterChange = (target) => {
    filters[target.name] = target.value;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    filterStore.searchApps(filters);
  }

  return (
    <div className="row filter-panel">
      <form className="row" onSubmit={handleSubmit}>
        <AgeFilter onChange={handleFilterChange}/>
        <RankFilter onChange={handleFilterChange}/>
        <CategoryFilter onChange={handleFilterChange}/>
        <Button type="submit" variant="contained" color="secondary">
          Search apps
        </Button>
      </form>
    </div>
  )

}

