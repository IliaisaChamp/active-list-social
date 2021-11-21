import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function ReportPreviousImages({ itemData }) {
  return (
    <ImageList
      // cols={3}
      // rowHeight={250}
      sx={{ maxHeight: 600, border: '1px dashed green', width: '100%', height: '200px' }}
      cols={4}
      rowHeight={220}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          sx={{
            maxWidth: 199,
            maxHeight: 199,
            height: '100%',
            width: '100%',
          }}
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
