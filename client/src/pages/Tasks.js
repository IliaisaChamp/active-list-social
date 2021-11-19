// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page/Page';

import { useDispatch, useSelector } from 'react-redux';
//
// import TASKS from '../_mocks_/products';

import TaskSort from '../components/TaskSort/TaskSort';
import TaskList from '../components/TasksList/TasksList';
import { useEffect } from 'react';
import { getAllTasks } from '../store/ac/tasksAC';

// ----------------------------------------------------------------------

export default function Tasks() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  // console.log(tasks);

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  return (
    <Page title="Tasks">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Tasks
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <TaskSort />
          </Stack>
        </Stack>

        <TaskList tasks={tasks} />
      </Container>
    </Page>
  );
}
