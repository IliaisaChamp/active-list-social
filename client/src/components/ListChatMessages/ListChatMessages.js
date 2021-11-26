import React from 'react';
import { Button, Grid, ListItem, ListItemText } from '@mui/material';
import { fDateTime } from '../../utils/formatTime';
import { Link } from 'react-router-dom';

//-------------------------------------------------------------------

function ListChatMessages({ messages, user }) {
  return (
    <>
      {messages.map((message) => (
        <ListItem key={message.id}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align={user.id === message.user_id ? 'right' : 'left'}>
                <Button component={Link} to={`/profile/${message.user_id}`}>
                  {message.User.nickname}
                </Button>
              </ListItemText>
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

// <Typography
//     ali
//     gutterBottom
//     variant="h6"
//     component={Link}
//     to={`/profile/${id}`}
//     sx={{ textDecoration: 'none', color: 'inherit', mb: '5px' }}>
//   {first_name + ' ' + last_name}
// </Typography>

export default React.memo(ListChatMessages);
