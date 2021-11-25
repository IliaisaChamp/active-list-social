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

import { getAllTasks, setTasks, subscribeOnTask } from '../store/ac/tasksAC';
import { getFilteredTasks } from '../store/ac/tasksAC';
import TagsCloud from '../components/TagCloud/TagCloud';
import axios from 'axios';
import { BASE_URL_API } from '../config/constants';
import { Box } from '@mui/system';
import { startLoading, stopLoading } from '../store/ac/isLoadingAC';

import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader/Loader';
// ----------------------------------------------------------------------

export default function Tasks() {
  const [filterName, setFilterName] = useState('');
  const [tags, setTags] = useState([]);
  const [filterUsed, setFilterUsed] = useState(false);
  const tasks = useSelector((state) => state.tasks);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllTasks());
    return () => {
      dispatch(setTasks([]));
    };
  }, []);

  useEffect(() => {
    if (filterUsed) {
      dispatch(getFilteredTasks(filterName));
    }
  }, [filterName]);

  const subscribeOnTaskToggle = useCallback(
    (taskId) => {
      dispatch(subscribeOnTask(taskId));
    },
    [dispatch],
  );

  const filterHandler = useCallback((event) => {
    setFilterUsed(true);
    setFilterName(event.target.value);
  }, []);

  const fetchTags = useCallback(async () => {
    try {
      const response = await axios(`${BASE_URL_API}/tasks/categories`);
      const { tags } = await response.data;
      setTags(tags);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <Page title={t('pages.goals.head')}>
      <Container maxWidth="xl">
        <Typography align="center" variant="h4" sx={{ mb: 5 }}>
          {t('pages.goals.title')}
        </Typography>
        <Box sx={{ maxWidth: '50%', ml: 'auto', mr: 'auto', textAlign: 'center' }}>
          <TagsCloud tags={tags} />
        </Box>
        <SearchBar filterName={filterName} onFilterName={filterHandler} />

        {isLoading > 0 ? <Loader /> : <TasksList tasks={tasks} subscribeOnTaskToggle={subscribeOnTaskToggle} buttonName={'Добавить'} />}
      </Container>
    </Page>
  );
}
