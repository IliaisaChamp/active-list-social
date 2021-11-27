import React from 'react';
import { Avatar, Badge, Grid, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { alpha, useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { chooseChatRoom, leaveRoom, setMessages, setRoom } from '../../store/ac/chatAc';
import { BASE_URL_AVATAR } from '../../config/constants';

//-----------------------------------------------------------------------

function ListChatRooms({ rooms, currentRoomId }) {
  const dispatch = useDispatch();
  const online = useSelector((state) => state.onlineUsers);
  const currentRoom = useSelector((state) => state.chat.room);
  const { t } = useTranslation();
  const theme = useTheme();
  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  };

  const chooseRoom = (roomId) => {
    dispatch(chooseChatRoom(roomId));
  };

  const leaveRoomHandler = (e, id) => {
    e.stopPropagation();
    dispatch(leaveRoom(id, t));
    if (currentRoom === id) {
      dispatch(setRoom());
      dispatch(setMessages([]));
    }
  };

  return (
    <List>
      {rooms.map((room) => (
        <Grid key={room.id} sx={{ ...(room.id === currentRoomId && activeRootStyle) }} container>
          <Grid item xs={12}>
            <ListItem onClick={() => currentRoom !== room.id && chooseRoom(room.id)} button key={room.id}>
              <ListItemIcon sx={{ position: 'relative' }}>
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent=""
                  variant="dot"
                  overlap="circular"
                  color={online.includes(String(room.user.id)) ? 'success' : 'error'}
                >
                  <Avatar alt={room.user.nickname} src={`${BASE_URL_AVATAR}/${room.user.avatar}`} />
                </Badge>
              </ListItemIcon>
              <ListItemText secondary={room.user.nickname} />
              <IconButton onClick={(e) => leaveRoomHandler(e, room.id)}>
                <ClearIcon color="action" fontSize="small" />
              </IconButton>
              {room.hasMessages && <MailOutlineIcon color="success" sx={{ position: 'absolute', left: '93%', top: '-20%' }} />}
            </ListItem>
          </Grid>
        </Grid>
      ))}
    </List>
  );
}

export default React.memo(ListChatRooms);
