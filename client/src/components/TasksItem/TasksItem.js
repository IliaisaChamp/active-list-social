import React from 'react';

// mui
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/Task';
import AddIcon from '@mui/icons-material/Add';

const TasksItem = ({ task, subscribeHandler }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ListIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={task.title} />
      <IconButton edge="end" aria-label="delete">
        <CheckCircleIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete">
        <TaskIcon />
      </IconButton>
      <IconButton onClick={() => subscribeHandler(task.id)} edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={() => subscribeHandler(task.id)} edge="end" aria-label="delete">
        <AddIcon />
      </IconButton>
    </ListItem>
  );
};

export default TasksItem;
