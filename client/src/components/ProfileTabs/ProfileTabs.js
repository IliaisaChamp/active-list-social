import React, { useCallback } from 'react';

// mui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, Table, TableBody, TableContainer, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [value, setValue] = React.useState('1');

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label={isSelfPage ? `${t('pages.profile.tabs.mytask')}` : `${t('pages.profile.tabs.task')}`} value="1" />
            <Tab label={isSelfPage ? `${t('pages.profile.tabs.myreports')}` : `${t('pages.profile.tabs.reports')}`} value="2" />
            <Tab label={isSelfPage ? `${t('pages.profile.tabs.mysub')}` : `${t('pages.profile.tabs.sub')}`} value="3" />
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
            {reports.length > 0 ? (
              <Grid container spacing={3}>
                {reports.map((report, index) => (
                  <LentaPostCard key={report.id} report={report} index={index} />
                ))}
              </Grid>
            ) : (
              <Typography>{t('pages.profile.tabs.noreports')}</Typography>
            )}
          </Container>
        </TabPanel>
        <TabPanel sx={tabPanelStyle} value="3">
          {userSubscribes.length > 0 ? (
            <SubscribesList isSelfPage={isSelfPage} userSubscribes={userSubscribes} unsubcsribeFromUser={unsubcsribeFromUser} />
          ) : (
            <Typography>{t('pages.profile.tabs.nosub')}</Typography>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProfileTabs;
