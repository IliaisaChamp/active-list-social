import React, { useState, useCallback, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Avatar, Badge, CardContent, IconButton, Stack, Typography } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReportById } from '../../store/ac/reportsAC';
import CommentForm from '../Comment/CommentForm';
import Comments from '../Comment/Comments';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from 'axios';
import { BASE_URL_API, BASE_URL_AVATAR, BASE_URL_REPORT_IMAGES } from '../../config/constants';
import { fDateTime } from '../../utils/formatTime';
import Loader from '../Loader/Loader';

// ----------------------------------------------------------------------

export default function DetailReport() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentReport = useSelector((state) => state.currentReport);
  const isLoading = useSelector((state) => state.isLoading);

  const user = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false);
  const [time, setTime] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [likesCount, setLikesCount] = useState(currentReport?.Likes?.length);

  const findUserLike = useCallback((userID) => currentReport?.Likes?.find((like) => userID === like.user_id), [currentReport?.Likes]);

  useEffect(() => {
    const isLiked = findUserLike(user?.id);
    setIsLiked(!!isLiked);
    setLikesCount(currentReport?.Likes?.length);
    setTime(currentReport?.createdAt);
    if (user) {
      setDisabled(false);
    }
  }, [currentReport, user, findUserLike]);

  const handleSetLike = () => {
    setLikeFetch();
  };

  const setLikeFetch = useCallback(() => {
    axios
      .post(`${BASE_URL_API}/reports/${id}/like`)
      .then(() => {
        setIsLiked(!isLiked);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      })
      .catch((error) => setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1)));
  }, [isLiked, id]);

  useEffect(() => {
    dispatch(getReportById(id));
  }, [id, dispatch]);

  return (
    <>
      {isLoading > 0 ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            {currentReport.Task?.title}
          </Typography>

          <Carousel autoPlay={false} emulateTouch={true} useKeyboardArrows={true} style={{ backgroundColor: 'green' }}>
            {currentReport?.images?.length ? (
              currentReport?.images?.map((el, id) => (
                <div key={id}>
                  <img
                    src={`${BASE_URL_REPORT_IMAGES}${el}`}
                    style={{ maxHeight: '450px', width: '100%', objectFit: 'contain' }}
                    alt={el.src}
                  />
                </div>
              ))
            ) : (
              <div key={id}>
                <img src={`/static/defaultred.webp`} style={{ maxHeight: '300px', width: '100%', objectFit: 'contain' }} alt="default" />
              </div>
            )}
          </Carousel>

          <CardContent>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
              <RouterLink to={`/profile/${currentReport?.user_id}`}>
                <Avatar alt={currentReport?.User?.nickname} src={BASE_URL_AVATAR + currentReport?.User?.avatar} />
              </RouterLink>
              <Typography
                style={{ textDecoration: 'none', color: 'inherit' }}
                gutterBottom
                variant="h5"
                component={RouterLink}
                to={`/profile/${currentReport.User?.id}`}>
                {currentReport.User?.nickname}
              </Typography>
              <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                {fDateTime(time)}
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
                disabled={disabled}
                onClick={handleSetLike}>
                <Badge badgeContent={likesCount} color="primary">
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

          {currentReport?.Comments?.length ? <Comments comments={currentReport?.Comments} /> : null}
          {!!user ? <CommentForm /> : null}
        </>
      )}
    </>
  );
}
