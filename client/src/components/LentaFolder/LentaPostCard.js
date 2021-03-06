import { Link as RouterLink, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { styled } from '@mui/material/styles';
import { Link, Card, Grid, Avatar, Typography, CardContent, Stack, CardActionArea, Slide } from '@mui/material';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import SvgIconStyle from '../SvgIconStyle/SvgIconStyle';
import { fDateTime } from '../../utils/formatTime';
import { BASE_URL_AVATAR, BASE_URL_REPORT_IMAGES } from '../../config/constants';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 2.5 / 4)',
});

const TitleStyle = styled(Link)({
  marginBottom: 10,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 45,
  height: 45,
  position: 'absolute',
  left: theme.spacing(2),
  bottom: theme.spacing(-3),
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export default function LentaPostCard({ report }) {
  const { images, desc, User, Task, createdAt, id, Likes, Comments } = report;
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState();
  const [disabled, setDisabled] = useState(true);
  const [likesCount, setLikesCount] = useState(Likes?.length);

  const findUserLike = useCallback((userID) => Likes?.find((like) => userID === like.user_id), [Likes]);

  useEffect(() => {
    const like = findUserLike(user?.id);
    setIsLiked(like);
    setLikesCount(Likes.length);
    if (user) {
      setDisabled(false);
    }
  }, [user, Likes.length, findUserLike]);

  const setLikeFetch = useCallback(() => {
    axios
      .post(`${BASE_URL_REPORT_IMAGES}${id}/like`)
      .then(() => {
        setIsLiked(!isLiked);
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      })
      .catch(() => setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1)));
  }, [isLiked, id]);

  const handleSetLike = () => {
    setLikeFetch();
  };

  return (
    <Slide direction="up" timeout={1500} in mountOnEnter unmountOnExit>
      <Grid item xs={10} sm={10} md={8}>
        <Card sx={{ position: 'relative', border: '1px solid white' }}>
          <CardActionArea onClick={() => (user ? navigate(`/reports/${id}`) : navigate('/login'))}>
            <CardMediaStyle>
              <SvgIconStyle color="paper" src="/static/icons/shape-avatar.svg" />
              <AvatarStyle
                alt={User?.nickname}
                src={User?.avatar ? `${BASE_URL_AVATAR}/${User?.avatar}` : '/static/defaultavatar.png'}
              />
              <CoverImgStyle
                alt={User?.nickname}
                src={images?.length ? BASE_URL_REPORT_IMAGES + images[0] : '/static/defaultred.webp'}
              />
            </CardMediaStyle>
          </CardActionArea>
          <CardContent>
            <Stack direction="row" justifyContent="flex-start" alignItems="baseline" spacing={2}>
              <Typography
                gutterBottom
                variant="h6"
                component={RouterLink}
                to={`/profile/${User?.id}`}
                sx={{ textDecoration: 'none', color: 'inherit', mb: '5px' }}
              >
                @
                {User?.nickname}
              </Typography>
            </Stack>

            <Typography>{Task.title}</Typography>
            <TitleStyle color="inherit" variant="subtitle2" underline="hover" component={RouterLink} to={`/reports/${id}`}>
              {desc}
            </TitleStyle>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
              <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                {fDateTime(createdAt)}
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                <IconButton
                  color={isLiked ? 'error' : 'default'}
                  size="large"
                  sx={{ padding: '5px' }}
                  disabled={disabled}
                  onClick={handleSetLike}
                >
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
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Slide>
  );
}
