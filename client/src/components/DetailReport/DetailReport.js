import React, { useState, useCallback, useEffect } from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { Paper, Button } from '@mui/material';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Carousel } from 'react-responsive-carousel';
import { CardContent, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReportById } from '../../store/ac/reportsAC';

const BASE_URL = 'http://localhost:3001/img/reports/';

export default function DetailReport() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const currentReport = useSelector((state) => state.currentReport);

  useEffect(() => {
    dispatch(getReportById(id));
  }, [id, dispatch]);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
       {currentReport.Task?.title}
      </Typography>

      <Carousel
        autoPlay={false}
        emulateTouch={true}
        useKeyboardArrows={true}
        style={{ backgroundColor: 'green' }}
      >
        {currentReport?.images?.map((el, id) => (
          <div key={id}>
            <img
              src={`${BASE_URL}${el}`}
              style={{ maxHeight: '500px', width: '100%', objectFit: 'contain' }}
              alt={el.src}
            />
          </div>
        ))}
      </Carousel>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          @{currentReport.User?.nickname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {currentReport.desc}
        </Typography>
      </CardContent>
    </>
  );
}
