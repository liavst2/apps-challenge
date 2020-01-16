
import * as React from "react";
import { Subscribe } from "@storex/react";

import { filterStore } from "../../storage/filter.store";
import { Select, MenuItem } from "@material-ui/core";

export function Filters() {

  return (
    <div className="row filter-panel">
      <AgeFilter />
      <RankFilter />
      <CategoryFilter/>
    </div>
  )

}


function AgeFilter() {

  const [age, setAge] = React.useState(1991);
  const handleAgeChange = ({ target }) => {
    setAge(target.value);
  }

  return (
    <Select
      disableUnderline
      value={age}
      onChange={handleAgeChange}
    >
      {filterStore.birthYears.map(year => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  )

}

function RankFilter() {

  const [rank, setRank] = React.useState(2);
  const handleRankChange = ({ target }) => {
    setRank(target.value);
  }

  return (
    <Select
      disableUnderline
      value={rank}
      onChange={handleRankChange}
    >
      {filterStore.ranks.map(rank => (
        <MenuItem key={rank} value={rank}>
          {rank}
        </MenuItem>
      ))}
    </Select>
  )

}

function CategoryFilter() {

  const [categories, setCategories] = React.useState([]);
  const handleCategoryChange = ({ target }) => {
    setCategories(target.value);
  }

  return (
    <Subscribe to={filterStore}>
      {() => (
        <Select
          disableUnderline
          multiple
          value={categories}
          onChange={handleCategoryChange}
        >
          {(filterStore.categories || []).map(categorie => (
            <MenuItem key={categorie} value={categorie}>
              {categorie}
            </MenuItem>
          ))}
        </Select>
      )}
    </Subscribe>
  )

}
