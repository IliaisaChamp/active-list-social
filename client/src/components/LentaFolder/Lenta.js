import { Grid, Container } from '@mui/material';
import Page from '../Page/Page';
import { LentaPostCard } from '../LentaFolder';
//
import POSTS from '../../_mocks_/blog';
import RightSideLentaMenu from './RightSideLentaMenu';


export default function Blog() {
  return (
    <Page title="Лента">
      <Container sx={{display: 'flex', position: 'relative'}}>
        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <LentaPostCard key={post.id} post={post} index={index} />
            ))}
        </Grid>
            <RightSideLentaMenu/>
      </Container>
    </Page>
  );
}
