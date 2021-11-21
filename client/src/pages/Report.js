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
  // const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  return (
    <Page title="Report">
      <Container>
        <Outlet />

      </Container>
    </Page>
  );
}
