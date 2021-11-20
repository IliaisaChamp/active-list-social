// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page/Page';

import { useDispatch } from 'react-redux';

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
      </Container>
    </Page>
  );
}
