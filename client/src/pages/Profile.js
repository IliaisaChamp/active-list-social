import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// mui
import { Container, Grid } from '@mui/material';

import Page from '../components/Page/Page';
import AppWeeklySales from '../components/ProfileStats/AppWeeklySales';
import AppNewUsers from '../components/ProfileStats/AppNewUsers';
import AppItemOrders from '../components/ProfileStats/AppItemOrders';
import AppBugReports from '../components/ProfileStats/AppBugReports';
import AppCurrentVisits from '../components/ProfileStats/AppCurrentVisits';
import AppWebsiteVisits from '../components/ProfileStats/AppWebsiteVisits';
import AppConversionRates from '../components/ProfileStats/AppConversionRates';
import AppCurrentSubject from '../components/ProfileStats/AppCurrentSubject';
// import AppNewsUpdate from '../components/ProfileStats/AppNewsUpdate';
// import AppOrderTimeline from '../components/ProfileStats/AppOrderTimeline';
// import AppTrafficBySite from '../components/ProfileStats/AppTrafficBySite';
// import AppTasks from '../components/ProfileStats/AppTasks';
import UserProfile from '../components/UserProfile/UserProfile';

import { completeTask, getUsersTasks, unsubscribeOnTask } from '../store/ac/tasksAC';
import ProfileTabs from '../components/ProfileTabs/ProfileTabs';
import { getUserReports, setReports } from '../store/ac/reportsAC';

const Profile = () => {
  const tasks = useSelector((state) => state.tasks);
  const { id } = useParams();
  const {user, reports} = useSelector((state) => state);
  const dispatch = useDispatch();
  const isSelfPage = +id === +user.id;

  useEffect(() => {
    // if (user) {
    dispatch(getUsersTasks(id));
    dispatch(getUserReports(id));
  }, [id]);

  const unscubscribeHandler = (taskId) => {
    dispatch(unsubscribeOnTask(taskId));
  };

  const completeTaskHandler = (taskId) => {
    dispatch(completeTask(taskId));
  };

  return (
    <Page title="Profile">
      <Container maxWidth="xl">
        <UserProfile isSelfPage={isSelfPage} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} xl={12} lg={12}>
            <ProfileTabs
              isSelfPage={isSelfPage}
              tasks={tasks}
              reports={reports}
              subscribeHandler={unscubscribeHandler}
              completeTaskHandler={completeTaskHandler}
              buttonName={'Удалить'}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Profile;
