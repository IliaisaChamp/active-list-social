import React from 'react';
import { Avatar, Badge, Button, Grid, Icon, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { BASE_URL_AVATAR } from '../../config/constants';
import { chooseChatRoom, leaveRoom } from '../../store/ac/chatAc';
import { useDispatch, useSelector } from 'react-redux';
import { alpha, useTheme } from '@mui/material/styles';
import { Label } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';

function ListChatRooms({ rooms, currentRoomId }) {
  const dispatch = useDispatch();
  const online = useSelector((state) => state.onlineUsers);
  const { t } = useTranslation();

  const theme = useTheme();
  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    // '&:before': { display: 'block' },
  };

  const chooseRoom = (roomId) => {
    console.log('roomI222d ->>>', roomId);
    dispatch(chooseChatRoom(roomId));
  };

  const leaveRoomHandler = (e, id) => {
    e.stopPropagation();
    dispatch(leaveRoom(id, t));
  };

  return (
    <List>
      {rooms.map((room) => (
        <Grid key={room.id} sx={{ ...(room.id === currentRoomId && activeRootStyle) }} container>
          <Grid item xs={12}>
            <ListItem
              // sx={{ ...(room.id === currentRoomId && activeRootStyle) }}
              onClick={() => chooseRoom(room.id)}
              button
              key={room.id}>
              <ListItemIcon>
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent=""
                  variant="dot"
                  overlap="circular"
                  color={online.includes(String(room.user.id)) ? 'success' : 'error'}>
                  <Avatar alt={room.user.nickname} src={`${BASE_URL_AVATAR}/${room.user.avatar}`} />
                </Badge>
              </ListItemIcon>
              <ListItemText secondary={room.user.nickname} />
              <IconButton onClick={(e) => leaveRoomHandler(e, room.id)}>
                <ClearIcon color="action" fontSize="small" />
              </IconButton>
            </ListItem>
          </Grid>
        </Grid>
      ))}
    </List>
  );
}

export default React.memo(ListChatRooms);
