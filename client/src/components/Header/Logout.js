import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import logOutFill from '@iconify/icons-eva/log-out-fill';
import { logoutUser } from '../../store/ac/authAC';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <IconButton size="large" color="default" onClick={() => dispatch(logoutUser(navigate))}>
      <Icon icon={logOutFill} width={20} height={20} />
    </IconButton>
  );
};

export default Logout;
