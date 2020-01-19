
import * as React from "react";

import { filterStore } from "../../storage/filter.store";
import { Select, MenuItem, FormControl, makeStyles, InputLabel, FormHelperText } from "@material-ui/core";
import { Subscribe } from "@storex/react";

const useStyles = width => makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: width,
  },
}));


function _SelectableFilter({
  field,
  label,
  filterStoreKey,
  currentValue,
  helperText,
  onChange,
  classes,
  selectOptions = {}
}) {
  // const classes = useStyles({});
  const [filter, setFilter] = React.useState(currentValue);
  const handleFilterChange = ({ target }) => {
    setFilter(target.value);
    onChange(target);
  }

  return (
    <FormControl required className={classes.formControl}>
      <InputLabel id={`${field}-filter-select`}>{label}</InputLabel>
      <Subscribe to={filterStore}>
        {() => (
          <Select
            labelId={`${field}-filter-select`}
            id={`${field}-filter`}
            value={filter}
            name={field}
            onChange={handleFilterChange}
            {...selectOptions}
          >
            {(filterStore[filterStoreKey] || []).map(key => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        )}
      </Subscribe>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )

}

export function AgeFilter({ onChange }) {

  return _SelectableFilter({
    field: "year",
    label: "Birthdate",
    filterStoreKey: "years",
    currentValue: null,
    helperText: "Enter your birth year",
    classes: useStyles(120)({}),
    onChange
  })

}

export function CategoryFilter({ onChange }) {

  return _SelectableFilter({
    onChange,
    field: "categories",
    label: "Preffered categories",
    filterStoreKey: "categories",
    currentValue: [],
    helperText: "Choose 3 categories",
    classes: useStyles(180)({}),
    selectOptions: {
      multiple: true,
      renderValue: (selected: any) => {
        if ((selected || []).length > 1) {
          return [`${selected.length} categories selected`];
        }
        return selected;
      }
    }
  })

}

export function RankFilter({ onChange }) {

  return _SelectableFilter({
    field: "rank",
    label: "Rating",
    filterStoreKey: "ranks",
    currentValue: null,
    helperText: "Minimum rating of the app",
    classes: useStyles(120)({}),
    onChange
  })

}
