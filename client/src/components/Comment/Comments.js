import React from 'react';
import { useSelector } from 'react-redux';
import { Paper } from '@mui/material';
import CommentItem from './CommentItem';

export default function Comments({ comments }) {
  const user = useSelector((state) => state.user);
  return (
    <div style={{ padding: 14 }}>
      <Paper style={{ padding: '5px' }}>
        {comments?.map((comment) => {
          if (!comment.User) {
            comment.User = user;
          }
          return <CommentItem key={comment.id} comment={comment} />;
        })}
      </Paper>
    </div>
  );
}
