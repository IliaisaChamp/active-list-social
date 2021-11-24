import React from 'react';
import { useSelector } from 'react-redux';
import { Paper } from '@mui/material';
import CommentItem from './CommentItem';
import { Box } from '@mui/system';

export default function Comments({ comments }) {
  const user = useSelector((state) => state.user);
  return (
    <Box
      style={{ padding: 14, maxHeight: 380, overflow: 'auto' }}
      sx={{ boxShadow: 5, borderColor: 'primary.main' }}
    >
      <Paper style={{ padding: '5px' }}>
        {comments?.map((comment) => {
          if (!comment.User) {
            comment.User = user;
          }
          return <CommentItem key={comment.id} comment={comment} />;
        })}
      </Paper>
    </Box>
  );
}
