import React, { useState } from 'react';
import { Stack, Button, TableRow, TableCell, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';

const TasksItem = ({ id, title, subscribeHandler, buttonName }) => {
  const [isDisabled, setisDisabled] = useState(false);

  const clickHandler = () => {
    setisDisabled(!isDisabled);
    subscribeHandler(id);
  };

  return (
    <TableRow hover key={id} tabIndex={-1}>
      <TableCell padding="checkbox"></TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="right">
        <Button
          variant="contained"
          to="#"
          startIcon={<Icon icon={plusFill} />}
          onClick={clickHandler}
          disabled={isDisabled}>
          {buttonName}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default React.memo(TasksItem);
