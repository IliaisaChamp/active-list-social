import { MenuItem, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setAllReportsForTopSortedByComments, setAllReportsForTopSortedByLikes } from '../../store/ac/reportsAC';

// ----------------------------------------------------------------------

export default function TopPostsSort({ options }) {
  const dispatch = useDispatch();
  const [stateValue, setstateValue] = useState('Популярные');
  const clickHandler = (e) => {
    if (e.target.value === 'Популярные') {
      setstateValue('Популярные');
      dispatch(setAllReportsForTopSortedByLikes());
    }
    if (e.target.value === 'Комментируемые') {
      setstateValue('Комментируемые');
      dispatch(setAllReportsForTopSortedByComments());
    }
  };
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
