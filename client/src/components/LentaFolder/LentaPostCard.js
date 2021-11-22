import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
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
} from '@mui/material';
// utils
import { fDateTime } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
//
import SvgIconStyle from '../SvgIconStyle/SvgIconStyle';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 2.5 / 4)',
});

const TitleStyle = styled(Link)({
  // height: 44,
  marginBottom: 10,
  overflow: 'hidden',
  WebkitLineClamp: 1,
  display: '-webkit-box',
  textOverflow: 'ellipsis',
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
  // marginTop: theme.spacing(3),
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
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};


const BASE_URL = 'http://localhost:3001/img/';
const BASE_URL_REPORT_IMAGES = 'http://localhost:3001/img/reports/';

export default function LentaPostCard({ post, index }) {
  const { images, desc, User, task_id, createdAt, id } = post;

  const POST_INFO = [
    { number: 100, icon: messageCircleFill },
    { number: 100, icon: eyeFill },
    { number: 100, icon: shareFill },
  ];

  return (
    <Grid item xs={10} sm={10} md={10}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle>
          <SvgIconStyle color="paper" src="/static/icons/shape-avatar.svg" />
          <AvatarStyle alt={User?.nickname} src={`${BASE_URL}${User?.avatar}`} />
          <CoverImgStyle alt={User?.nickname} src={BASE_URL_REPORT_IMAGES + images[0]} />
        </CardMediaStyle>

        <CardContent>
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {fDateTime(createdAt)}
          </Typography>

          {/* <Typography>
            @{User.nickname}
          </Typography> */}

          <TitleStyle
            to={`/reports/${id}`}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            {desc}
          </TitleStyle>
          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box key={index}>
                <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
