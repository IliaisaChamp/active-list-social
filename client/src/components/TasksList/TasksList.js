import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

// import ListItemIcon from '@mui/material/ListItemIcon';
import TasksItem from '../TasksItem/TasksItem';
import { Typography } from '@mui/material';

const TasksList = ({ tasks, subscribeHandler, buttonName }) => {
  return (
    <>
      {tasks.length > 0 ? (
        <Box sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 3 }}>
          <List dense={true}>
            {tasks.map((task) => (
              <TasksItem key={task.id} task={task} subscribeHandler={subscribeHandler} />
            ))}
          </List>
        </Box>
      ) : (
        <Typography>No Tasks</Typography>
      )}
    </>
  );
};

export default TasksList;
