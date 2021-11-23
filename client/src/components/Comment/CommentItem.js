import React from 'react';
import { Divider, Avatar, Grid } from '@mui/material';
import { fDateTime, fToNow } from '../../utils/formatTime';
import { BASE_URL_AVATAR } from '../../config/constants';

export default function CommentItem({ comment }) {
  const { text, createdAt, User} = comment;
  return (
    <>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt={User?.nickname} src={BASE_URL_AVATAR + User?.avatar} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: 'left' }}>{User?.nickname}</h4>
          <p style={{ textAlign: 'left' }}>{text}</p>
          {/* <p style={{ textAlign: 'left', color: 'gray' }}>{fDateTime(createdAt)}</p> */}
          <p style={{ textAlign: 'left', color: 'gray' }}>{fToNow(createdAt)}</p>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
    </>
  );
}
