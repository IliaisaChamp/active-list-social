import React, { useEffect, useState } from 'react';

// mui
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';

import TasksItem from '../TasksItem/TasksItem';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const TasksList = ({ tasks, subscribeOnTaskToggle, completeTaskHandler, isSelfPage }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [currentTasks, setCurrentTasks] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [tasks]);
  useEffect(() => {
    const endOffset = itemOffset + 5;
    setPageCount(Math.ceil(tasks.length / 5));
    setCurrentTasks(tasks.slice(itemOffset, endOffset));
  }, [currentPage, tasks]);

  const handleChange = (event, value) => {
    const newOffset = (value * 5) % tasks.length;
    setCurrentPage(value);
    setItemOffset(newOffset);
  };

  return (
    <>
      {tasks.length > 0 ? (
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
      ) : (
        <Typography>{t('pages.profile.tabs.notasks')}</Typography>
      )}
    </>
  );
};

export default React.memo(TasksList);
