import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../Page/Page';
import { TopPostCard, TopPostsSort, TopPostsSearch } from '.';
//
import POSTS from '../../_mocks_/blog';
import { setReports } from '../../store/ac/reportsAC';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function Top() {
  const reports = useSelector(state => state.reports)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setReports());
  }, [])
  
  return (
    <Page title="Топ">
      <Container>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Post
          </Button>
        </Stack> */}

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <TopPostsSearch posts={POSTS} />
          <TopPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {reports.map((report, index) => (
            <TopPostCard key={report.id} report={report} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
