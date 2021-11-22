// material
import { Container } from '@mui/material';
// components
import Page from '../components/Page/Page';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllTasks } from '../store/ac/tasksAC';
import { Outlet } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Report() {

  return (
    <Page title="Report">
      <Container>
        <Outlet />
      </Container>
    </Page>
  );
}
