import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TableRow, TableCell, Avatar, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import Label from '../Label/Label';
import useChat from '../../hooks/useChat';
import { BASE_URL_AVATAR } from '../../config/constants';

//-----------------------------------------------------------------------

function SubscribesItem({ userInfo, unsubcsribeFromUser, isOnline, isSelfPage }) {
  const { id, nickname, first_name: firstName, last_name: lastName, avatar } = userInfo;
  const user = useSelector((state) => state.user);
  const openChat = useChat();
  const openChatHandler = () => {
    openChat(id);
  };

  return (
    <TableRow hover>
      <TableCell sx={{ padding: 2 }} padding="checkbox">
        <Avatar src={`${BASE_URL_AVATAR}/${avatar}`} />
      </TableCell>
      <TableCell align="left">
        <Button component={Link} to={`/profile/${id}`}>
          {`${firstName} ${lastName}`}
        </Button>
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
}

export default SubscribesItem;
