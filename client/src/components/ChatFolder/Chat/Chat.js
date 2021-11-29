import {
  Avatar,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { BASE_URL_AVATAR } from '../../../config/constants';
import { loadRooms } from '../../../store/ac/chatAc';
import ListChatMessages from '../../ListChatMessages/ListChatMessages';
import ListChatRooms from '../../ListChatRooms/ListChatRooms';
import ChatMessageForm from '../../ChatMessageForm/ChatMessageForm';

//-----------------------------------------------------------------------------

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderLeft500: {
    borderLeft: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});

//------------------------------------------------------------------------

function Chat() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.chat.rooms);
  const currentRoomId = useSelector((state) => state.chat.room);
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    dispatch(loadRooms(user.id));
  }, [user, dispatch]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {/* chat-messages */}
            <ListChatMessages messages={messages} user={user} />
          </List>
          <Divider />
          {/* chat-input */}
          {currentRoomId && <ChatMessageForm currentRoomId={currentRoomId} />}
        </Grid>
        <Grid item xs={3} className={classes.borderLeft500}>
          <List>
            <ListItem button key="Owner">
              <ListItemIcon>
                <Avatar alt="User" src={`${BASE_URL_AVATAR}/${user?.avatar}`} />
              </ListItemIcon>
              <ListItemText primary={user.nickname} />
            </ListItem>
          </List>
          <Divider />
          {/* search */}
          <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
          </Grid>
          <Divider />
          {/* chat-rooms */}
          <ListChatRooms rooms={rooms} currentRoomId={currentRoomId} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chat;
