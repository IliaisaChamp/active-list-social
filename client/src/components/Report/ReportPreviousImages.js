import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/system';

export default function ReportPreviousImages({ itemData }) {
  return (
    <ImageList sx={{ maxHeight: 600 }} cols={1}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            sx={{
              maxWidth: 199,
              maxHeight: 199,
              height: '100%',
              width: '100%',
              border: '1px dashed green',
            }}>
            <img src={item.img} alt={item.title} loading="lazy" style={{ objectFit: 'cover', height: '100%' }} />
          </ImageListItem>
        ))}
      </Box>
    </ImageList>
  );
}
