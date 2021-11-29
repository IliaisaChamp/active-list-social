import React from 'react';
import { TableRow, TableCell } from '@mui/material';

function SubscribesHead({ isSelfPage }) {
  return (
    <TableRow>
      <TableCell padding="checkbox" />
      <TableCell align="left">Name</TableCell>
      <TableCell align="left">Nickname</TableCell>
      <TableCell align="left">Status</TableCell>
      <TableCell align="left" />
      {isSelfPage && <TableCell align="left" />}
    </TableRow>
  );
}

export default SubscribesHead;
