import React, { useEffect, useState } from 'react';
// import ReactPaginate from 'react-paginate';

import Box from '@mui/material/Box';
// import List from '@mui/material/List';

// import TasksItem from '../TasksItem/TasksItem';
import { Typography } from '@mui/material';

import PaginatedItems from '../Paginate/Paginate';

const TasksList = ({ tasks, subscribeOnTaskToggle, completeTaskHandler, isSelfPage }) => {
  return (
    <>
      {tasks.length > 0 ? (
        <Box sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 3, overflow: 'hidden' }}>
          {/* <List dense={true} sx={{ padding: 0 }}> */}
          {/* {tasks.map((task) => (
              <TasksItem
                key={task.id}
                task={task}
                subscribeOnTaskToggle={subscribeOnTaskToggle}
                isSelfPage={isSelfPage}
                completeTaskHandler={completeTaskHandler}
              />
            ))} */}
          <PaginatedItems
            itemsPerPage={5}
            tasks={tasks}
            subscribeOnTaskToggle={subscribeOnTaskToggle}
            completeTaskHandler={completeTaskHandler}
            isSelfPage={isSelfPage}
          />
          {/* </List> */}
        </Box>
      ) : (
        <Typography>No Tasks</Typography>
      )}
    </>
  );
};

export default React.memo(TasksList);
