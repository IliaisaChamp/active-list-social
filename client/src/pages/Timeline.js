import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, Container, Typography } from '@mui/material';
import Page from '../components/Page/Page';
import Loader from '../components/Loader/Loader';
import LentaPostCard from '../components/LentaFolder/LentaPostCard';
import RightSideLentaMenu from '../components/LentaFolder/RightSideLentaMenu';
import { getReports, setReports } from '../store/ac/reportsAC';

export default function Timeline() {
  const reports = useSelector((state) => state.reports);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);

  const [currentReports, setCurrentReports] = useState(null);

  const scrollHandler = (e) => {
    const heightFromBot = e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight);
    if (reports.length > offset && heightFromBot < 100) {
      setOffset((prev) => prev + 1);
    }
  };

  const memoizedScrollHandler = useCallback(scrollHandler, [reports, offset]);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getReports());
    return () => {
      dispatch(setReports([]));
    };
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('scroll', memoizedScrollHandler);
    return () => {
      document.removeEventListener('scroll', memoizedScrollHandler);
    };
  }, [memoizedScrollHandler]);

  useEffect(() => {
    setCurrentReports(reports.slice(0, offset + 1));
  }, [offset, reports]);

  return (
    <Page title={t('pages.timeline.title')}>
      {isLoading > 0 ? (
        <Loader />
      ) : (
        <>
          <Typography align="center" variant="h4" sx={{ mb: 5 }}>
            {t('pages.timeline.title')}
          </Typography>
          <Container sx={{ display: 'flex', position: 'relative', padding: 4 }}>
            <Grid container spacing={4}>
              {currentReports?.map((report, index) => (
                <LentaPostCard key={report.id} report={report} index={index} />
              ))}
            </Grid>
          </Container>
        </>
      )}

      <RightSideLentaMenu />
    </Page>
  );
}
