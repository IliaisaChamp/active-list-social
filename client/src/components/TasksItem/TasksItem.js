import React from 'react';
import { useLocation } from 'react-router-dom';

// mui
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/Task';
import AddIcon from '@mui/icons-material/Add';

const completedItemStyle = {
  backgroundColor: 'primary.lighter',
  color: 'primary.darker',
};
const incompletedItemStyle = {
  backgroundColor: 'error.lighter',
  color: 'error.darker',
};

const RootStyle = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2, 2),
}));

const TasksItem = ({ task, subscribeHandler, isSelfPage, completeTaskHandler }) => {
  const location = useLocation();
  const isPageTask = location.pathname.includes('tasks');

  return (
    <RootStyle
      divider={true}
      sx={isPageTask ? {} : task.isDone ? { ...completedItemStyle } : { ...incompletedItemStyle }}>
      <ListItemText primary={task.title} primaryTypographyProps={{ variant: 'subtitle2' }} />
      {isPageTask ? (
        <IconButton onClick={() => subscribeHandler(task.id)} edge="end" aria-label="delete">
          <AddIcon />
        </IconButton>
      ) : isSelfPage ? (
        <>
          {!task.isDone && (
            <IconButton onClick={() => completeTaskHandler(task.id)} edge="end" aria-label="complete-task">
              <CheckCircleIcon />
            </IconButton>
          )}
          <IconButton edge="end" aria-label="add-report">
            <TaskIcon />
          </IconButton>
          <IconButton onClick={() => subscribeHandler(task.id)} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </>
      ) : null}
    </RootStyle>
  );
};

export default TasksItem;
