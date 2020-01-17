
import * as React from "react";

import { filterStore } from "../../storage/filter.store";
import { Select, MenuItem, FormControl, makeStyles, InputLabel, FormHelperText } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
}));

export function AgeFilter({ onChange }) {

  const classes = useStyles({});
  const [year, setYear] = React.useState(null);
  const handleYearChange = ({ target }) => {
    setYear(target.value);
    onChange(target);
  }

  return (
    <FormControl required className={classes.formControl}>
      <InputLabel id="age-filter-select">Birthdate</InputLabel>
      <Select
        labelId="age-filter-select"
        value={year}
        name="year"
        onChange={handleYearChange}
      >
        {filterStore.birthYears.map(year => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Enter your birth year</FormHelperText>
    </FormControl>
  )

}
