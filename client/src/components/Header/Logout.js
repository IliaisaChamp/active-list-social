import React from 'react';
import { useDispatch } from 'react-redux';

import { IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import logOutFill from '@iconify/icons-eva/log-out-fill';
import { logoutUser } from '../../store/ac/authAC';

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <IconButton size="large" color="default" onClick={() => dispatch(logoutUser())}>
      <Icon icon={logOutFill} width={20} height={20} />
    </IconButton>
  );
};

export default Logout;
