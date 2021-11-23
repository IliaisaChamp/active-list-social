import React from 'react';

// mui
import { TableRow, TableCell, TableHead } from '@mui/material';

const SubscribesHead = ({ isSelfPage }) => {
  return (
    <TableRow>
      <TableCell padding="checkbox"></TableCell>
      <TableCell align="left">Name</TableCell>
      <TableCell align="left">Nickname</TableCell>
      <TableCell align="left">Status</TableCell>
      <TableCell align="left"></TableCell>
      {isSelfPage && <TableCell align="left"></TableCell>}
    </TableRow>
  );
};

export default SubscribesHead;
