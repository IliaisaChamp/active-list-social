import {
  Avatar,
  Container,
  Divider,
  Fab,
  Grid,
  Icon,
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
import React, { useEffect, useState } from 'react';
import { BASE_URL_AVATAR } from '../../../config/constants';
import { createMessage, chooseChatRoom, loadUserChats, resetChat, setRoom } from '../../../store/ac/chatAc';
import { fDateTime, fToNow } from '../../../utils/formatTime';
import { alpha, useTheme } from '@mui/material/styles';

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

const Chat = () => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [chatInput, setChatInput] = useState('');
  const rooms = useSelector((state) => state.chat.rooms);
  const currentRoomId = useSelector((state) => state.chat.room);
  const messages = useSelector((state) => state.chat.messages);

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    // bgcolor: alpha(theme.palette.primary.darker, theme.palette.action.selectedOpacity),
  };


  useEffect(() => {
    dispatch(loadUserChats(user.id));
    return () => dispatch(resetChat());
  }, [user, dispatch]);

  const chooseRoomHandler = (roomId) => {
    console.log('roomId ->>>', roomId);
    dispatch(chooseChatRoom(roomId));
  };

  const messageChangeHandle = (e) => {
    setChatInput(e.target.value);
  };

  const messageSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(createMessage(formData, currentRoomId));
    setChatInput('');
  };
  return (
    <>
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
            </List>
            <Divider />

            {/*chat-input*/}
            {currentRoomId && (
              <form onSubmit={messageSubmitHandler}>
                <Grid container style={{ padding: '20px' }}>
                  <Grid item xs={11}>
                    <TextField
                      value={chatInput}
                      name="message"
                      onChange={messageChangeHandle}
                      id="outlined-basic-email"
                      label="Type Something"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1} align="right">
                    <Fab type="submit" color="primary" aria-label="add">
                      <Icon />
                    </Fab>
                  </Grid>
                </Grid>
              </form>
            )}
          </Grid>
          <Grid item xs={3} className={classes.borderLeft500}>
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar alt="User" src={`${BASE_URL_AVATAR}/${user.avatar}`} />
                </ListItemIcon>
                <ListItemText primary={user.nickname}/>
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }}>
              <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
            </Grid>
            <Divider />
            <List>
              {rooms.map((room) => (
                <ListItem
                  // sx={{...(room.id === currentRoomId && activeRootStyle)}}
                    sx={{...(room.id === currentRoomId && {bgcolor: '#DDFBD1' })}}
                  // sx={{ ...(room.id === currentRoomId && activeRootStyle) }}
                  onClick={() => chooseRoomHandler(room.id)}
                  button
                  key={room.id}>
                  <ListItemIcon>
                    <Avatar alt={room.user.nickname} src={`${BASE_URL_AVATAR}/${room.user.avatar}`} />
                  </ListItemIcon>
                  <ListItemText primary={room.user.nickname}>{room.user.nickname}</ListItemText>
                  <ListItemText secondary="online" align="right"></ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Chat;
