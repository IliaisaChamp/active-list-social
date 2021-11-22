import { Grid, Container } from '@mui/material';
import Page from '../Page/Page';
import { LentaPostCard } from '../LentaFolder';
import { useDispatch, useSelector } from 'react-redux';
// import POSTS from '../../_mocks_/blog';
import RightSideLentaMenu from './RightSideLentaMenu';
import { useEffect } from 'react';
import { setReports } from '../../store/ac/reportsAC';


export default function Blog() {
  const reports = useSelector(state => state.reports)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setReports());
  }, [])

  return (
    <Page title="Лента">
      <Container sx={{ display: 'flex', position: 'relative' }}>
        <Grid container spacing={3}>
          {reports?.map((report, index) => (
            <LentaPostCard key={report.id} post={report} index={index} />
          ))}
        </Grid>
        <RightSideLentaMenu />
      </Container>
    </Page>
  );
}
