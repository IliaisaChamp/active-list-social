import React from 'react';

// mui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container, Grid } from '@mui/material';

// my components
import TasksList from '../TasksList/TasksList';
import { LentaPostCard } from '../LentaFolder';
// import POSTS from '../../_mocks_/blog';

const tabPanelStyle = {
  padding: '24px 0',
};

const ProfileTabs = ({ tasks, subscribeToggle, isSelfPage, completeTaskHandler, reports }) => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label={isSelfPage ? 'Мои таски' : 'Таски'} value="1" />
            <Tab label={isSelfPage ? 'Мои отчеты' : 'Отчеты'} value="2" />
            <Tab label={isSelfPage ? 'Мои подписки' : 'Подписки'} value="3" />
          </TabList>
        </Box>
        <TabPanel sx={tabPanelStyle} value="1">
          <TasksList
            tasks={tasks}
            subscribeToggle={subscribeToggle}
            completeTaskHandler={completeTaskHandler}
            isSelfPage={isSelfPage}
          />
        </TabPanel>
        <TabPanel sx={tabPanelStyle} value="2">
          <Container sx={{ display: 'flex', position: 'relative' }}>
            <Grid container spacing={3}>
              {reports.map((report, index) => (
                <LentaPostCard key={report.id} report={report} index={index} />
              ))}
            </Grid>
          </Container>
        </TabPanel>
        <TabPanel value="3">Мои подписки</TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProfileTabs;
