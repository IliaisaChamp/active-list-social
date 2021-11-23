import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page/Page';

//
// import TASKS from '../_mocks_/products';

// import TaskSort from '../components/TaskSort/TaskSort';
import TasksList from '../components/TasksList/TasksList';
import SearchBar from '../components/SearchBar/SearchBar';

import { getAllTasks, subscribeOnTask } from '../store/ac/tasksAC';
import { getFilteredTasks } from '../store/ac/tasksAC';

// ----------------------------------------------------------------------

export default function Tasks() {
  const [filterName, setFilterName] = useState('');
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const location = useLocation();
  const isPageProfile = location.pathname.includes('profile');

  const subscribeToggle = useCallback(
    (taskId) => {
      dispatch(subscribeOnTask(taskId));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  useEffect(() => {
    if (!isPageProfile) {
      dispatch(getFilteredTasks(filterName));
    }
  }, [isPageProfile, filterName, dispatch]);

  const filterHandler = useCallback((event) => {
    setFilterName(event.target.value);
  }, []);

  return (
    <Page title="Tasks">
      <Container>
        <Typography align="center" variant="h4" sx={{ mb: 5 }}>
          Список целей
        </Typography>
        <SearchBar filterName={filterName} onFilterName={filterHandler} />

        <TasksList tasks={tasks} subscribeToggle={subscribeToggle} buttonName={'Добавить'} />
      </Container>
    </Page>
  );
}
