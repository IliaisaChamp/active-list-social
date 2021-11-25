import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Stack, Avatar, Button, TableRow, TableCell, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { useTranslation } from 'react-i18next';
import Label from '../Label/Label';

const RecommendationItem = ({ userInfo, subcsribeHandler, unsubcsribeHandler, isOnline, isSubscribed }) => {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell sx={{ padding: 2 }} padding="checkbox">
        <Avatar alt={userInfo.nickname} src={'http://localhost:3001/img/' + userInfo.avatar} />
      </TableCell>
      <TableCell align="left">
        <Typography
          gutterBottom
          variant="h6"
          component={RouterLink}
          to={`/profile/${userInfo?.id}`}
          sx={{ textDecoration: 'none', color: 'inherit', mb: '5px' }}>
          {userInfo?.nickname}
        </Typography>
      </TableCell>
      <TableCell align="left">{userInfo.percentCommonTasks}%</TableCell>
      <TableCell align="left">{userInfo.reportsCount}</TableCell>
      <TableCell align="left">
        <Label variant="ghost" color={isOnline ? 'success' : 'error'}>
          {isOnline ? 'Online' : 'Offline'}
        </Label>
      </TableCell>

      <TableCell align="center">
        {isSubscribed ? (
          <Button variant="outlined" onClick={() => unsubcsribeHandler(user.id, userInfo.id)} startIcon={<Icon icon={closeFill} />}>
            {t('pages.recommend.unsub')}
          </Button>
        ) : (
          <Button variant="contained" onClick={() => subcsribeHandler(user.id, userInfo.id)} startIcon={<Icon icon={plusFill} />}>
            {t('pages.recommend.sub')}
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default RecommendationItem;
