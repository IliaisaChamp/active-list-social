import React from 'react';
import { Divider, Avatar, Grid } from '@material-ui/core';

export default function CommentItem() {
  return (
    <>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
          <p style={{ textAlign: 'left' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed
            faucibus. Duis bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis.
            Pellentesque at interdum tortor. Quisque arcu quam, malesuada vel mauris et, posuere
            sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit metus, efficitur
            lobortis nisi quis, molestie porttitor metus. Pellentesque et neque risus. Aliquam
            vulputate, mauris vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
            lectus vitae ex.{' '}
          </p>
          <p style={{ textAlign: 'left', color: 'gray' }}>posted 1 minute ago</p>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
    </>
  );
}
