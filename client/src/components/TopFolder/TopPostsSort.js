import PropTypes from 'prop-types';
// material
import { MenuItem, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAllReportsForTopSortedByComments, setAllReportsForTop, setAllReportsForTopSortedByLikes } from '../../store/ac/reportsAC';
import { useState } from 'react';



// ----------------------------------------------------------------------

TopPostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func
};

export default function TopPostsSort({ options }) {
  const dispatch = useDispatch()
  const [stateValue, setstateValue] = useState('Проcматриваемые')
  const clickHandler = (e) => {
    if (e.target.value === "Популярные") {
      setstateValue('Популярные')
      dispatch(setAllReportsForTopSortedByLikes())
    }
    if (e.target.value === "Комментируемые") {
      setstateValue('Комментируемые')
      dispatch(setAllReportsForTopSortedByComments())
    }
    if (e.target.value === "Проcматриваемые") {
      setstateValue('Проcматриваемые')
    }
    
  }
  return (
    <TextField select size="small" value={stateValue} onChange={clickHandler}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
