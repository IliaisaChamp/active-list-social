import React from 'react';
import { Divider, Avatar, Grid } from '@mui/material';
import { fDateTime } from '../../utils/formatTime';
import { BASE_URL_AVATAR } from '../../config/constants';
import { Link } from 'react-router-dom';

export default function CommentItem({ comment }) {
  const { text, createdAt, User, user_id } = comment;

  return (
    <>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Link to={`/profile/${user_id}`}>
            <Avatar alt={User?.nickname} src={`${BASE_URL_AVATAR}/${User?.avatar}`} />
          </Link>
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Link to={`/profile/${user_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h4 style={{ margin: 0, textAlign: 'left' }}>&#64;{User?.nickname}</h4>
          </Link>
          <p style={{ textAlign: 'left' }}>{text}</p>
          <p style={{ textAlign: 'left', color: 'gray' }}>{fDateTime(createdAt)}</p>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: '5px 0 10px 0' }} />
    </>
  );
}
