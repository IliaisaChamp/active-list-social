import React from 'react';
import { Container } from '@mui/material';

function Loader() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }} maxWidth="xl">
      <img
        style={{ display: 'block', zIndex: 100 }}
        src="https://media2.giphy.com/media/3ov9jQKWfIZedOqVa0/giphy.gif?cid=790b76116a38dd75c811721322d416cdeb59456a5edc6263&rid=giphy.gif&ct=g"
        alt="Бип-бип"
      />
    </Container>
  );
}

export default Loader;
