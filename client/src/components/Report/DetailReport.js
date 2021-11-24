import React, { useState, useCallback, useEffect, useMemo } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Avatar, Badge, CardContent, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReportById } from '../../store/ac/reportsAC';
import CommentForm from '../Comment/CommentForm'
import Comments from '../Comment/Comments'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from 'axios';
import { BASE_URL_AVATAR } from '../../config/constants';

const BASE_URL = 'http://localhost:3001/img/reports/';

export default function DetailReport() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const currentReport = useSelector((state) => state.currentReport);

  const user = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(currentReport?.Likes?.length);

  const findUserLike = (userID) => {
    return currentReport?.Likes?.find((like) => userID === like.user_id);
  };
  const memoizeValue = useMemo(() => findUserLike(user?.id), []);

  useEffect(() => {
    setIsLiked(!!memoizeValue);
  }, []);

  const handleSetLike = () => {
    setLikeFetch();
  };

  const setLikeFetch = useCallback(() => {
    axios
      .post(`http://localhost:3001/api/reports/${id}/like`)
      .then(() => {
        setIsLiked(!isLiked);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      })
      .catch((error) => setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1)));
  }, [isLiked]);

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
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
          <RouterLink to={`/profile/${currentReport?.user_id}`}>
            <Avatar
              alt={currentReport?.User?.nickname}
              src={BASE_URL_AVATAR + currentReport?.User?.avatar}
            />
          </RouterLink>
          <Typography
            style={{ textDecoration: 'none', color: 'inherit' }}
            gutterBottom
            variant="h5"
            component={RouterLink}
            to={`/profile/${currentReport.User?.id}`}
            // sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            &#64;{currentReport.User?.nickname}
          </Typography>
        </Stack>
        <Typography padding={2} color="text.secondary">
          {currentReport.desc}
        </Typography>

        <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
          <IconButton
            color={isLiked ? 'error' : 'default'}
            size="large"
            sx={{ padding: '5px' }}
            onClick={handleSetLike}
          >
            <Badge badgeContent={likesCount ?? ''} color="primary">
              <FavoriteIcon fontSize="inherit" />
            </Badge>
          </IconButton>

          <IconButton color="default" size="large" sx={{ padding: '5px' }}>
            <Badge badgeContent={currentReport.Comments?.length} color="primary">
              <ChatBubbleOutlineIcon fontSize="inherit" />
            </Badge>
          </IconButton>
        </Stack>
      </CardContent>

      <Comments comments={currentReport?.Comments} />
      <CommentForm />
    </>
  );
}