import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import TasksItem from '../TasksItem/TasksItem';
const TasksList = ({ tasks, subscribeOnTaskToggle, completeTaskHandler, isSelfPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [currentTasks, setCurrentTasks] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
    setItemOffset(0);
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + 5;
    setPageCount(Math.ceil(tasks.length / 5));
    setCurrentTasks(tasks.slice(itemOffset, endOffset));
  }, [currentPage, tasks]);

  const handleChange = (event, value) => {
    let newOffset;
    if (value === 1) {
      newOffset = 0;
    } else {
      newOffset = (value * 5) % tasks.length;
    }
    setCurrentPage(value);
    setItemOffset(newOffset);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        boxShadow: 3,
        borderRadius: 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <List dense={true} sx={{ padding: 0, width: '100%' }}>
        {currentTasks?.map((task) => (
          <TasksItem
            key={task.id}
            task={task}
            subscribeOnTaskToggle={subscribeOnTaskToggle}
            isSelfPage={isSelfPage}
            completeTaskHandler={completeTaskHandler}
          />
        ))}
      </List>
      <Box sx={{ padding: 3 }}>
        <Pagination count={pageCount} page={currentPage} onChange={handleChange} />
      </Box>
    </Box>
  );
};

export default React.memo(TasksList);
