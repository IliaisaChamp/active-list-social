import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

import TasksItem from '../TasksItem/TasksItem';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const TasksList = ({ tasks, subscribeOnTaskToggle, completeTaskHandler, isSelfPage }) => {
  const { t } = useTranslation();
  return (
    <>
      {tasks.length > 0 ? (
        <Box sx={{ flexGrow: 1, boxShadow: 3, borderRadius: 3, overflow: 'hidden' }}>
          <List dense={true} sx={{ padding: 0 }}>
            {tasks.map((task) => (
              <TasksItem
                key={task.id}
                task={task}
                subscribeOnTaskToggle={subscribeOnTaskToggle}
                isSelfPage={isSelfPage}
                completeTaskHandler={completeTaskHandler}
              />
            ))}
          </List>
        </Box>
      ) : (
        <Typography>{t('pages.profile.tabs.notasks')}</Typography>
      )}
    </>
  );
};

export default React.memo(TasksList);
