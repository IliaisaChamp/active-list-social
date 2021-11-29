import React, { useState } from 'react';
import { Fab, Grid, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import ChatSharpIcon from '@mui/icons-material/ChatSharp';
import { useTranslation } from 'react-i18next';
import { createMessage } from '../../store/ac/chatAc';

//--------------------------------------------------------------------

function ChatMessageForm({ currentRoomId }) {
  const [chatInput, setChatInput] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const messageSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(createMessage(formData, currentRoomId, t));
    setChatInput('');
  };

  const messageChangeHandle = (e) => {
    setChatInput(e.target.value);
  };

  return (
    <form onSubmit={messageSubmitHandler}>
      <Grid container style={{ padding: '20px' }}>
        <Grid item xs={11}>
          <TextField
            value={chatInput}
            name="message"
            onChange={messageChangeHandle}
            id="outlined-basic-email"
            label="Type Something"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={1} align="right">
          <Fab type="submit" color="primary" aria-label="add">
            <ChatSharpIcon />
          </Fab>
        </Grid>
      </Grid>
    </form>
  );
}

export default React.memo(ChatMessageForm);
