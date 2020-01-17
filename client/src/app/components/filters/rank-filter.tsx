
import * as React from "react";

import { filterStore } from "../../storage/filter.store";
import { Select, MenuItem, makeStyles, FormControl, InputLabel, FormHelperText } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
}));

export function RankFilter({ onChange }) {

  const classes = useStyles({});
  const [rank, setRank] = React.useState(null);
  const handleRankChange = ({ target }) => {
    setRank(target.value);
    onChange(target);
  }

  return (
    <FormControl required className={classes.formControl}>
      <InputLabel id="rank-filter-select">Rating</InputLabel>
      <Select
        labelId="rank-filter-select"
        value={rank}
        name="rank"
        onChange={handleRankChange}
      >
        {filterStore.ranks.map(rank => (
          <MenuItem key={rank} value={rank}>
            {rank}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Minimum rating of the app</FormHelperText>
    </FormControl>
  )

}
