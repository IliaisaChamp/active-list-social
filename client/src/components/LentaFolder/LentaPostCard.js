import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Stack,
  CardActionArea,
} from '@mui/material';
// utils
import { fDateTime } from '../../utils/formatTime';
//
import SvgIconStyle from '../SvgIconStyle/SvgIconStyle';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 2.5 / 4)',
});

const TitleStyle = styled(Link)({
  marginBottom: 10,
  overflow: 'hidden',
  WebkitLineClamp: 1,
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

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
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

LentaPostCard.propTypes = {
  report: PropTypes.object.isRequired,
  index: PropTypes.number,
};

const BASE_URL = 'http://localhost:3001/img/';
const BASE_URL_REPORT_IMAGES = 'http://localhost:3001/img/reports/';

export default function LentaPostCard({ report, index }) {
  const { images, desc, User, Task, createdAt, id, Likes } = report;
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Likes?.length);

  const findUserLike = (userID) => {
    return Likes?.find((like) => userID === like.user_id);
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


  console.log('render');
  return (
    <Grid item xs={10} sm={10} md={8}>
      <Card sx={{ position: 'relative', border: '1px solid white' }}>
        <CardActionArea onClick={() => navigate(`/reports/${id}`)}>
          <CardMediaStyle>
            <SvgIconStyle color="paper" src="/static/icons/shape-avatar.svg" />
            <AvatarStyle alt={User?.nickname} src={`${BASE_URL}${User?.avatar}`} />
            <CoverImgStyle
              alt={User?.nickname}
              src={images ? BASE_URL_REPORT_IMAGES + images[0] : ''}
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
              @{User?.nickname}
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: 'text.disabled', display: 'block' }}
            >
              {fDateTime(createdAt)}
            </Typography>
          </Stack>

          {/* <Typography>{Task.title}</Typography> */}
          <TitleStyle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            to={`/reports/${id}`}
          >
            {desc}
          </TitleStyle>
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
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
