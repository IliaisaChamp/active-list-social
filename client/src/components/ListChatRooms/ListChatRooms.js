import React from 'react';
import { Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { BASE_URL_AVATAR } from '../../config/constants';
import { chooseChatRoom } from '../../store/ac/chatAc';
import { useDispatch, useSelector } from 'react-redux';
import {alpha, useTheme} from "@mui/material/styles";

function ListChatRooms({ rooms, currentRoomId }) {
  const dispatch = useDispatch();

  const theme = useTheme();
  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' },
  };

  const chooseRoomHandler = (roomId) => {
    console.log('roomId ->>>', roomId);
    dispatch(chooseChatRoom(roomId));
  };

  return (
    <List>
      {rooms.map((room) => (
        <ListItem
            sx={{...(room.id === currentRoomId && activeRootStyle),}}
          onClick={() => chooseRoomHandler(room.id)}
          button
          key={room.id}>
          <ListItemIcon>
            <Avatar alt={room.user.nickname} src={`${BASE_URL_AVATAR}/${room.user.avatar}`} />
          </ListItemIcon>
          <ListItemText primary={room.user.nickname}>{room.user.nickname}</ListItemText>
          <ListItemText secondary="online" align="right" />
        </ListItem>
      ))}
    </List>
  );
}

export default React.memo(ListChatRooms);
