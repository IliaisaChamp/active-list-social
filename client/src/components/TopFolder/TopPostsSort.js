import PropTypes from 'prop-types';
// material
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

TopPostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func
};

export default function TopPostsSort({ options, onSort }) {
  return (
    <TextField select size="small" value="Популярные" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
