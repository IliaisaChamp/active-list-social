import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { FixedSizeList } from 'react-window';

// import ListItemIcon from '@mui/material/ListItemIcon';
import TasksItem from '../TasksItem/TasksItem';
import { Typography } from '@mui/material';

const TasksList = ({ tasks, subscribeHandler, completeTaskHandler, isSelfPage }) => {
  return (
    <>
      {tasks.length > 0 ? (
        <Box sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 3, overflow: 'hidden' }}>
          <List dense={true} sx={{ padding: 0 }}>
            {/* <FixedSizeList height={400} width={360} itemSize={46} itemCount={tasks.length} overscanCount={5}> */}
            {tasks.map((task) => (
              <TasksItem
                key={task.id}
                task={task}
                subscribeHandler={subscribeHandler}
                isSelfPage={isSelfPage}
                completeTaskHandler={completeTaskHandler}
              />
            ))}
            {/* </FixedSizeList> */}
          </List>
        </Box>
      ) : (
        <Typography>No Tasks</Typography>
      )}
    </>
  );
};

export default React.memo(TasksList);
