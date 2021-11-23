import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// mui
import { Container, Grid } from '@mui/material';

import Page from '../components/Page/Page';
import AppWeeklySales from '../components/ProfileStats/AppWeeklySales';
import AppNewUsers from '../components/ProfileStats/AppNewUsers';
import AppItemOrders from '../components/ProfileStats/AppItemOrders';
import AppBugReports from '../components/ProfileStats/AppBugReports';
import UserProfile from '../components/UserProfile/UserProfile';
import ProfileTabs from '../components/ProfileTabs/ProfileTabs';

import { completeTask, getUsersTasks, setTasks, unsubscribeOnTask } from '../store/ac/tasksAC';
import { getUserReports } from '../store/ac/reportsAC';
import { getSubsribes, setSubscribes, subscribeOnUser, unsubscribeFromUser } from '../store/ac/subscribesAC';
import { getCurrentUserSubscribes, setCurrentUserSubscribes } from '../store/ac/currentUserSubscribesAC';
import { setCurrentUser } from '../store/ac/currentUserAC';

const Profile = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const reports = useSelector((state) => state.reports);
  const tasks = useSelector((state) => state.tasks);
  const subscribes = useSelector((state) => state.subscribes);
  const currentUserSubscribes = useSelector((state) => state.currentUserSubscribes);

  const dispatch = useDispatch();
  const isSelfPage = +id === +user.id;

  useEffect(() => {
    dispatch(getUsersTasks(id));
    dispatch(getUserReports(id));
    dispatch(getSubsribes(user.id));
    if (!isSelfPage) {
      dispatch(getCurrentUserSubscribes(id));
    }
    return () => {
      dispatch(setTasks([]));
      dispatch(setSubscribes([]));
      dispatch(setCurrentUser(null));
      dispatch(setCurrentUserSubscribes([]));
      dispatch({
        type: 'SET_REPORTS',
        payload: [],
      });
    };
  }, [id]);

  const unscubscribeFromTask = useCallback(
    (taskId) => {
      dispatch(unsubscribeOnTask(taskId));
    },
    [dispatch]
  );

  const subcsribeOnUser = useCallback(
    (userId, followingsId) => {
      dispatch(subscribeOnUser(userId, followingsId));
    },
    [dispatch]
  );

  const unsubcsribeFromUser = useCallback(
    (userId, followingsId) => {
      dispatch(unsubscribeFromUser(userId, followingsId));
    },
    [dispatch]
  );

  const completeTaskHandler = useCallback((taskId) => {
    dispatch(completeTask(taskId));
  }, []);

  return (
    <Page title="Profile">
      <Container maxWidth="xl">
        <UserProfile isSelfPage={isSelfPage} subcsribeOnUser={subcsribeOnUser} />
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
              userSubscribes={isSelfPage ? subscribes : currentUserSubscribes}
              subscribeOnTaskToggle={unscubscribeFromTask}
              completeTaskHandler={completeTaskHandler}
              subcsribeOnUser={subcsribeOnUser}
              unsubcsribeFromUser={unsubcsribeFromUser}
              buttonName={'Удалить'}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Profile;
