import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// mui
import { TableRow, TableCell, Avatar, Button, Typography } from '@mui/material';
import Label from '../Label/Label';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { openChat } from '../../store/ac/chatAc';

const BASE_URL = 'http://localhost:3001/img/';

const SubscribesItem = ({ userInfo, unsubcsribeFromUser, isOnline, isSelfPage }) => {
  const { id, nickname, first_name, last_name, avatar } = userInfo;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const openChatHandler = () => {
    dispatch(openChat(id));
    navigate('/chats');
  };
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
        <Button onClick={openChatHandler}>Chat</Button>
      </TableCell>
      {isSelfPage && (
        <TableCell align="center">
          <Button onClick={() => unsubcsribeFromUser(user.id, id)} startIcon={<Icon icon={closeFill} />}>
            Unsubscribe
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default SubscribesItem;
