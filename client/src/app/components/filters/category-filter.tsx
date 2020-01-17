
import * as React from "react";
import { Subscribe } from "@storex/react";
import { Select, MenuItem, makeStyles, FormControl, InputLabel, FormHelperText } from "@material-ui/core";

import { filterStore } from "../../storage/filter.store";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 180,
  },
}));

export function CategoryFilter({ onChange }) {

  const classes = useStyles({});
  const [categories, setCategories] = React.useState([]);
  const handleCategoryChange = ({ target }) => {
    setCategories(target.value);
    onChange(target);
  }

  return (
    <FormControl required className={classes.formControl}>
      <InputLabel id="category-filter-select">Preffered categories</InputLabel>
      <Subscribe to={filterStore}>
        {() => (
          <Select
            labelId="category-filter-select"
            value={categories}
            name="categories"
            multiple
            renderValue={(selected: any) => {
              if ((selected || []).length > 1) {
                return [`${selected.length} categories selected`];
              }
              return selected;
            }}
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
      <FormHelperText>Choose only 3 categories</FormHelperText>
    </FormControl>
  )

}
