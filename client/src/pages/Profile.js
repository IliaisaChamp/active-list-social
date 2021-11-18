import React from 'react';

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
import AppNewsUpdate from '../components/ProfileStats/AppNewsUpdate';
import AppOrderTimeline from '../components/ProfileStats/AppOrderTimeline';
import AppTrafficBySite from '../components/ProfileStats/AppTrafficBySite';
import AppTasks from '../components/ProfileStats/AppTasks';
import UserProfile from '../components/UserProfile/UserProfile';

const Profile = () => {
  return (
    <Page title="Profile">
      <Container maxWidth="xl">
        <UserProfile />
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

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default Profile;
