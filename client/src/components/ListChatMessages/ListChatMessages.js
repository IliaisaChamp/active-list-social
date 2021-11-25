import React from 'react';
import { Avatar, Grid, ListItem, ListItemText } from '@mui/material';
import { BASE_URL_AVATAR } from '../../config/constants';
import { fDateTime } from '../../utils/formatTime';

function ListChatMessages({ messages, user }) {
  return (
    <>
      {messages.map((message) => (
        <ListItem key={message.id}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText
                align={user.id === message.user_id ? 'right' : 'left'}
                primary={<Avatar alt="User" src={`${BASE_URL_AVATAR}/${message.User.avatar}`} />}
              />
            </Grid>
            <Grid item xs={12}>
              <ListItemText align={user.id === message.user_id ? 'right' : 'left'} primary={message?.text} />
            </Grid>
            <Grid item xs={12}>
              <ListItemText align={user.id === message.user_id ? 'right' : 'left'} secondary={fDateTime(message?.createdAt)} />
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </>
  );
}

export default React.memo(ListChatMessages);
