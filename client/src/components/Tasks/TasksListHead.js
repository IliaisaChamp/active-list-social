import React from 'react';

// material
import { TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

const TasksListHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        <TableCell align={'left'}>
          <TableSortLabel>Task name</TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
export default React.memo(TasksListHead);
