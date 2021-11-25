import PropTypes from 'prop-types';
// material
import { MenuItem, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAllReportsForTopSortedByComments, setAllReportsForTop, setAllReportsForTopSortedByLikes } from '../../store/ac/reportsAC';



// ----------------------------------------------------------------------

TopPostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func
};

export default function TopPostsSort({ options }) {
  const dispatch = useDispatch()
  const clickHandler = (e) => {

    if (e.target.value === "Комментируемые") {
      dispatch(setAllReportsForTopSortedByComments())
    }
    else if (e.target.value === "Просматриваемые") {
      dispatch(setAllReportsForTopSortedByLikes())
    }
  }
  return (
    <TextField select size="small" value="Популярные" onChange={clickHandler}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
