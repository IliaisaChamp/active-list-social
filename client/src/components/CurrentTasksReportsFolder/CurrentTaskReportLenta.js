import { Grid, Container, Typography } from '@mui/material';
import Page from '../Page/Page';
import LentaPostCard from './LentaPostCard';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
//-----------------------------------------------------------------

export default function CurrentTaskReportLenta(taskId) {
  const reports = useSelector((state) => state.reports);
  const { t } = useTranslation();

  return (
    <Page title={t('pages.timeline.title')}>
      <Typography align="center" variant="h4" sx={{ mb: 5 }}>
        {reports.length > 0 ? t('pages.timeline.title') : 'Нет отчетов'}
      </Typography>
      <Container sx={{ display: 'flex', position: 'relative' }}>
        <Grid container spacing={4}>
          {reports?.map((report, index) => (
            <LentaPostCard key={report.id} report={report} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
