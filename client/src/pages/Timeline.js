import { Grid, Container, Typography } from '@mui/material';
import Page from '../components/Page/Page';
import LentaPostCard  from '../components/LentaFolder/LentaPostCard';
import { useDispatch, useSelector } from 'react-redux';
import RightSideLentaMenu from '../components/LentaFolder/RightSideLentaMenu';
import { useEffect } from 'react';
import { setReports } from '../store/ac/reportsAC';
import { useTranslation } from 'react-i18next';

export default function Timeline() {
  const reports = useSelector(state => state.reports)
  const dispatch = useDispatch()

   const { t } = useTranslation();


  useEffect(() => {
    dispatch(setReports());
  }, [])

  return (
    <Page title={t('pages.timeline.title')}>
      <Typography align="center" variant="h4" sx={{ mb: 5 }}>
        {t('pages.timeline.title')}
      </Typography>
      <Container sx={{ display: 'flex', position: 'relative' }}>
        <Grid container spacing={4}>
          {reports?.map((report, index) => (
            <LentaPostCard key={report.id} report={report} index={index} />
          ))}
        </Grid>
        <RightSideLentaMenu />
      </Container>
    </Page>
  );
}
