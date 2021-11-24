import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// mui
import { Container, Grid } from '@mui/material';

import Page from '../components/Page/Page';
import TasksOnSite from '../components/ProfileStats/TasksOnSite';
import ReportsOnSite from '../components/ProfileStats/ReportsOnSite';
import UserTasks from '../components/ProfileStats/UserTasks';
import UserReports from '../components/ProfileStats/UserReports';
import UserProfile from '../components/UserProfile/UserProfile';
import ProfileTabs from '../components/ProfileTabs/ProfileTabs';

import { completeTask, getUsersTasks, setTasks, unsubscribeOnTask } from '../store/ac/tasksAC';
import { getUserReports } from '../store/ac/reportsAC';
import { getSubsribes, setSubscribes, subscribeOnUser, unsubscribeFromUser } from '../store/ac/subscribesAC';
import { getCurrentUserSubscribes, setCurrentUserSubscribes } from '../store/ac/currentUserSubscribesAC';
import { getCurrentUser, setCurrentUser } from '../store/ac/currentUserAC';
import { getProfileStats, resetProfileStats } from '../store/ac/profileStatsAC';

const Profile = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const reports = useSelector((state) => state.reports);
  const tasks = useSelector((state) => state.tasks);
  const subscribes = useSelector((state) => state.subscribes);
  const currentUserSubscribes = useSelector((state) => state.currentUserSubscribes);
  const profileStats = useSelector((state) => state.profileStats);

  const dispatch = useDispatch();
  const isSelfPage = +id === +user?.id;

  useEffect(() => {
    dispatch(getUsersTasks(id));
    dispatch(getProfileStats(id));
    dispatch(getUserReports(id));
    if (user) {
      dispatch(getSubsribes(user.id));
    }
    if (!isSelfPage) {
      dispatch(getCurrentUserSubscribes(id));
      dispatch(getCurrentUser(id));
    }
    return () => {
      dispatch(setTasks([]));
      dispatch(setSubscribes([]));
      dispatch(setCurrentUser(null));
      dispatch(resetProfileStats());
      dispatch(setCurrentUserSubscribes([]));
      dispatch({
        type: 'SET_REPORTS',
        payload: [],
      });
    };
  }, [id, user, isSelfPage]);

  const unscubscribeFromTask = useCallback(
    (taskId) => {
      dispatch(unsubscribeOnTask(taskId));
    },
    [dispatch],
  );

  const subcsribeOnUser = useCallback(
    (userId, followingsId) => {
      dispatch(subscribeOnUser(userId, followingsId));
    },
    [dispatch],
  );

  const unsubcsribeFromUser = useCallback(
    (userId, followingsId) => {
      dispatch(unsubscribeFromUser(userId, followingsId));
    },
    [dispatch],
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
            <TasksOnSite stat={profileStats.tasksCount} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ReportsOnSite stat={profileStats.reportsCount} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UserTasks stat={profileStats.userTasksCount} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <UserReports stat={profileStats.userReportsCount} />
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
