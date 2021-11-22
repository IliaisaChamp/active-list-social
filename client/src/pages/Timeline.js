import { Grid, Container } from '@mui/material';
import Page from '../components/Page/Page';
import LentaPostCard  from '../components/LentaFolder/LentaPostCard';
import { useDispatch, useSelector } from 'react-redux';
import RightSideLentaMenu from '../components/LentaFolder/RightSideLentaMenu';
import { useEffect } from 'react';
import { setReports } from '../store/ac/reportsAC';


export default function Timeline() {
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
            <LentaPostCard key={report.id} report={report} index={index} />
          ))}
        </Grid>
        <RightSideLentaMenu />
      </Container>
    </Page>
  );
}
