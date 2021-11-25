import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Link, Card, Grid, Avatar, Typography, CardContent, IconButton, Stack, Badge } from '@mui/material';
import { fDate } from '../../utils/formatTime';
import SvgIconStyle from '../SvgIconStyle/SvgIconStyle';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from 'axios';
import { BASE_URL_AVATAR, BASE_URL_REPORT_IMAGES } from '../../config/constants';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

TopPostCard.propTypes = {
  post: PropTypes.object,
  index: PropTypes.number,
};

export default function TopPostCard({ report, index }) {
  const { images, desc, User, Task, createdAt, id, Likes, Comments } = report;
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState();
  const [disabled, setDisabled] = useState(true);
  const [likesCount, setLikesCount] = useState(Likes?.length);
  const findUserLike = useCallback((userID) => Likes?.find((like) => userID === like.user_id), [Likes]);

  useEffect(() => {
    const isLiked = findUserLike(user?.id);
    setIsLiked(!!isLiked);
    setLikesCount(Likes.length);
    if (user) {
      setDisabled(false);
    }
  }, [user, Likes.length, findUserLike]);

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

  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}>
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              ...((latestPostLarge || latestPost) && { display: 'none' }),
            }}
          />
          <AvatarStyle
            alt={User?.nickname}
            src={User?.avatar ? `${BASE_URL_AVATAR}${User?.avatar}` : '/static/defaultavatar.png'}
            component={RouterLink}
            to={`/profile/${User?.id}`}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />

          <CoverImgStyle alt={User?.nickname} src={images?.length ? BASE_URL_REPORT_IMAGES + images[0] : '/static/defaultred.webp'} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}>
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(createdAt)}
          </Typography>

          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            to={`/reports/${id}`}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
              }),
            }}>
            {desc}
          </TitleStyle>

          <InfoStyle>
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

              <IconButton color="default" size="large" sx={{ padding: '5px' }} onClick={() => navigate(`/reports/${id}`)}>
                <Badge badgeContent={Comments?.length} color="primary">
                  <ChatBubbleOutlineIcon fontSize="inherit" />
                </Badge>
              </IconButton>
            </Stack>
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
