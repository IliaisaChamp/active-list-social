import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function ReportPreviousImages({ itemData }) {
  return (
    <ImageList
      cols={3}
      rowHeight={250}
      sx={{ maxWidth: 500}}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img}
          sx={{ maxWidth: 250, maxHeight: 250, height: '100%', border: '1px solid orange' }}
        >
          <img
            src={item.img}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            style={{ objectFit: 'cover', height: '100%' }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
