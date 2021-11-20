// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page/Page';

import { useDispatch, useSelector } from 'react-redux';
//
// import TASKS from '../_mocks_/products';

// import TaskSort from '../components/TaskSort/TaskSort';
// import TaskList from '../components/TasksList/TasksList';
import TasksList from '../components/Tasks';
import { useEffect } from 'react';
import { getAllTasks, subscribeOnTask } from '../store/ac/tasksAC';

// ----------------------------------------------------------------------

export default function Tasks() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  // console.log(tasks);
  const subscribeHandler = (taskId) => {
    dispatch(subscribeOnTask(taskId));
  };

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  return (
    <Page title="Tasks">
      <Container>
        <Typography align="center" variant="h4" sx={{ mb: 5 }}>
          Tasks
        </Typography>

        <TasksList tasks={tasks} subscribeHandler={subscribeHandler} buttonName={'Добавить'} />
      </Container>
    </Page>
  );
}
