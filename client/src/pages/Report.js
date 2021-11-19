// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page/Page';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { getAllTasks } from '../store/ac/tasksAC';
import ReportForm from '../components/ReportForm/ReportForm';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function Report() {
  // const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  return (
    <Page title="Report">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {t('report.title')}
        </Typography>

        <ReportForm />
        {/* <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <TaskSort />
          </Stack>
        </Stack>

        <TaskList tasks={tasks} /> */}
      </Container>
    </Page>
  );
}
