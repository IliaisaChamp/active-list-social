import React from 'react';
import { useSelector } from 'react-redux';
// material
import { Stack, Avatar, Button, TableRow, TableCell, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import closeFill from '@iconify/icons-eva/close-fill';

import Label from '../Label/Label';

const RecommendationItem = ({ userInfo, subcsribeHandler, unsubcsribeHandler, isOnline, isSubscribed }) => {
  const user = useSelector((state) => state.user);

  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell sx={{ padding: 2 }} padding="checkbox">
        <Avatar alt={userInfo.nickname} src={'http://localhost:3001/img/' + userInfo.avatar} />
      </TableCell>
      <TableCell align="left">
        {/* <Stack direction="row" alignItems="center" spacing={2}> */}
        <Typography variant="subtitle2" noWrap>
          {userInfo.first_name}
        </Typography>
        {/* </Stack> */}
      </TableCell>
      <TableCell align="left">{userInfo.percentCommonTasks}%</TableCell>
      <TableCell align="left">{userInfo.reportsCount}</TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={isOnline ? 'success' : 'error'}>
          {isOnline ? 'Online' : 'Offline'}
        </Label>
      </TableCell>

      <TableCell align="center">
        {isSubscribed ? (
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
