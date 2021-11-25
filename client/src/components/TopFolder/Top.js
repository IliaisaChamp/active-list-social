import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Grid, Container, Stack, Typography } from '@mui/material';
import Page from '../Page/Page';
import { TopPostCard, TopPostsSort, TopPostsSearch } from '.';
import POSTS from '../../_mocks_/blog';
import { setAllReportsForTop } from '../../store/ac/reportsAC';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader/Loader';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'Популярные', label: 'Популярные' },
  { value: 'Просматриваемые', label: 'Просматриваемые' },
  { value: 'Комментируемые', label: 'Комментируемые' },
];

// ----------------------------------------------------------------------

export default function Top() {
  const reports = useSelector((state) => state.reports);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setAllReportsForTop());
  }, []);

  return (
    <Page title={t('pages.top.head')}>
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          {t('pages.top.title')}
        </Typography>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <TopPostsSearch posts={POSTS} />
          <TopPostsSort options={SORT_OPTIONS} />
        </Stack>

        {isLoading > 0 ? (
          <Loader />
        ) : (
          <Grid container spacing={3}>
            {reports.map((report, index) => (
              <TopPostCard key={report.id} report={report} index={index} />
            ))}
          </Grid>
        )}
      </Container>
    </Page>
  );
}
