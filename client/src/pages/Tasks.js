// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page/Page';

import { useDispatch, useSelector } from 'react-redux';
//
// import TASKS from '../_mocks_/products';

// import TaskSort from '../components/TaskSort/TaskSort';
// import TaskList from '../components/TasksList/TasksList';
// import Tasks2 from '../components/Tasks';

import { useEffect, useState } from 'react';
import { getAllTasks, subscribeOnTask } from '../store/ac/tasksAC';
import TasksList from '../components/TasksList/TasksList';
import SearchBar from '../components/SearchBar/SearchBar';

// ----------------------------------------------------------------------

export default function Tasks() {
  const [filterName, setFilterName] = useState('');
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  // console.log(tasks);
  const subscribeHandler = (taskId) => {
    dispatch(subscribeOnTask(taskId));
  };

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  const filterHandler = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Page title="Tasks">
      <Container>
        <Typography align="center" variant="h4" sx={{ mb: 5 }}>
          Список целей
        </Typography>
        <SearchBar filterName={filterName} onFilterName={filterHandler} />

        {/* <Tasks2 tasks={tasks} subscribeHandler={subscribeHandler} buttonName={'Добавить'} /> */}
        <TasksList tasks={tasks} subscribeHandler={subscribeHandler} buttonName={'Добавить'} />
      </Container>
    </Page>
  );
}
