import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const { id } = useParams();

  const isPageTask = location.pathname.includes('tasks');
  const isSelfPage = +id === +user.id;

  return (
    <ListItem divider={true} sx={{ padding: '10px 10px' }}>
      {/* <ListItemAvatar>
        <Avatar>
          <ListIcon />
        </Avatar>
      </ListItemAvatar> */}
      <ListItemText primary={task.title} primaryTypographyProps={{ variant: 'subtitle2' }} />
      {isPageTask ? (
        <IconButton onClick={() => subscribeHandler(task.id)} edge="end" aria-label="delete">
          <AddIcon />
        </IconButton>
      ) : isSelfPage ? (
          <div style={{ display: 'flex', alignItems: 'baseline' }} >
          <IconButton edge="end" aria-label="complete-task">
            <CheckCircleIcon />
          </IconButton>
            <IconButton edge="end" as={Link} to={`/reports/task/${task.id}/`} aria-label="add-report">
            <TaskIcon />
          </IconButton>
          <IconButton onClick={() => subscribeHandler(task.id)} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      ) : null}
    </ListItem>
  );
};

export default TasksItem;
