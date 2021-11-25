import React from 'react';
import { Link } from 'react-router-dom';
// mui
import { TableRow, TableCell, Avatar, Button, Typography } from '@mui/material';
import Label from '../Label/Label';
import { useSelector } from 'react-redux';
import { openChat } from '../../store/ac/chatAc';

const BASE_URL = 'http://localhost:3001/img/';

const SubscribesItem = ({ userInfo, unsubcsribeFromUser, isOnline, isSelfPage }) => {
  const { id, nickname, first_name, last_name, avatar } = userInfo;
  const user = useSelector((state) => state.user);
  return (
    <TableRow hover>
      <TableCell sx={{ padding: 2 }} padding="checkbox">
        <Avatar src={BASE_URL + avatar} />
      </TableCell>
      <TableCell align="left">
        <Typography
          gutterBottom
          variant="h6"
          component={Link}
          to={`/profile/${id}`}
          sx={{ textDecoration: 'none', color: 'inherit', mb: '5px' }}>
          {first_name + ' ' + last_name}
        </Typography>
      </TableCell>
      <TableCell align="left">{nickname}</TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={isOnline ? 'success' : 'error'}>
          {isOnline ? 'Online' : 'Offline'}
        </Label>
      </TableCell>
      <TableCell align="center">
        <Button onClick={''}>Chat</Button>
      </TableCell>
      {isSelfPage && (
        <TableCell align="center">
          <Button onClick={() => unsubcsribeFromUser(user.id, id)}>Unsubscribe</Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default SubscribesItem;
