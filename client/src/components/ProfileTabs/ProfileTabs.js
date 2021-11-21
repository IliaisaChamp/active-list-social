import React from 'react';
import { useDispatch } from 'react-redux';

// mui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// my components
// import Tasks from '../Tasks';

import { unsubscribeOnTask } from '../../store/ac/tasksAC';
import TasksList from '../TasksList/TasksList';

const tabPanelStyle = {
  padding: '24px 0',
};

const ProfileTabs = ({ tasks, subscribeHandler, buttonName }) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const unscubscribeHandler = (taskId) => {
    console.log('afasdf');
    dispatch(unsubscribeOnTask(taskId));
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Мои таски" value="1" />
            <Tab label="Мои отчеты" value="2" />
            <Tab label="Мои подписки" value="3" />
          </TabList>
        </Box>
        <TabPanel sx={tabPanelStyle} value="1">
          <TasksList tasks={tasks} subscribeHandler={unscubscribeHandler} buttonName={'Удалить'} />
        </TabPanel>
        <TabPanel sx={tabPanelStyle} value="2"></TabPanel>
        <TabPanel value="3">Мои подписки</TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProfileTabs;
