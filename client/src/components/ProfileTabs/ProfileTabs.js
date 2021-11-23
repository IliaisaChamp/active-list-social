import React, { useCallback } from 'react';

// mui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, Table, TableBody, TableContainer, Container, Grid } from '@mui/material';

// my components
import TasksList from '../TasksList/TasksList';
import { LentaPostCard } from '../LentaFolder';
import RecommendationsHead from '../RecommendationsHead/RecommentationsHead';
import RecommendationItem from '../RecommendationItem/RecommendationItem';
import Scrollbar from '../Scrollbar/Scrollbar';
import SubscribesList from '../SubscribesList/SubscribesList';

const tabPanelStyle = {
  padding: '24px 0',
};
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'nickName', label: 'nickName', alignRight: false },
  { id: 'rang', label: 'Rang', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

const ProfileTabs = ({
  tasks,
  subscribeOnTaskToggle,
  isSelfPage,
  completeTaskHandler,
  reports,
  userSubscribes,
  subcsribeOnUser,
  unsubcsribeFromUser,
}) => {
  const [value, setValue] = React.useState('1');

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

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
            subscribeOnTaskToggle={subscribeOnTaskToggle}
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
        <TabPanel sx={tabPanelStyle} value="3">
          {userSubscribes.length > 0 ? (
            <SubscribesList
              isSelfPage={isSelfPage}
              userSubscribes={userSubscribes}
              unsubcsribeFromUser={unsubcsribeFromUser}
            />
          ) : (
            <h1>нет друзей</h1>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProfileTabs;
