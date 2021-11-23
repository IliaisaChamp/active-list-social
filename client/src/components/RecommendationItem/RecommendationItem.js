import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material
import { Stack, Avatar, Button, TableRow, TableCell, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import closeFill from '@iconify/icons-eva/close-fill';

// utils
import { isSubscribed } from '../../utils/isSubscribed';

const RecommendationItem = ({ userInfo, subcsribeHandler, unsubcsribeHandler }) => {
  const subscribes = useSelector((state) => state.subscribes);
  const user = useSelector((state) => state.user);

  return (
    <TableRow
      hover
      tabIndex={-1}
      role="checkbox"
      // selected={isItemSelected}
      // aria-checked={isItemSelected}
    >
      <TableCell padding="checkbox"></TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={userInfo.nickname} src={'http://localhost:3001/img/' + userInfo.avatar} />
          <Typography variant="subtitle2" noWrap>
            {userInfo.first_name}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">{userInfo.percentCommonTasks}%</TableCell>
      <TableCell align="left">{userInfo.reportsCount}</TableCell>
      <TableCell align="left">
        {/* <Label variant="ghost" color={(status === 'Offline' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label> */}
      </TableCell>

      <TableCell align="right">
        {isSubscribed(subscribes, userInfo.id) ? (
          <Button
            variant="outlined"
            onClick={() => unsubcsribeHandler(user.id, userInfo.id)}
            startIcon={<Icon icon={closeFill} />}>
            Unsubscribe
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => subcsribeHandler(user.id, userInfo.id)}
            startIcon={<Icon icon={plusFill} />}>
            Subscribe
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default RecommendationItem;
