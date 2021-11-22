import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  Stack,
  CardActionArea,
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
  const { images, desc, User, Task, createdAt, id } = report;
 const navigate =  useNavigate()

  const POST_INFO = [
    { number: 100, icon: messageCircleFill },
    { number: 100, icon: eyeFill },
    { number: 100, icon: shareFill },
  ];

  return (
    <Grid item xs={10} sm={10} md={8}>
      <Card sx={{ position: 'relative', border: '1px solid white' }}>
        <CardActionArea onClick={() => navigate(`/reports/${id}`)}>
          <CardMediaStyle>
            <SvgIconStyle color="paper" src="/static/icons/shape-avatar.svg" />
            <AvatarStyle alt={User?.nickname} src={`${BASE_URL}${User?.avatar}`} />
            <CoverImgStyle alt={User?.nickname} src={BASE_URL_REPORT_IMAGES + images[0]} />
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
          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box key={index} sx={{ display: 'flex', mr: 0.5 }}>
                <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.2 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
