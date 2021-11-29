import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import { clearFlashMessage } from '../../store/ac/flashAC';

//-----------------------------------------------------------------

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export default function FlashMessage() {
  const [flash, setFlashState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    Transition: Slide,
  });

  const { vertical, horizontal, open } = flash;

  const { type, message } = useSelector((state) => state.flash);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setFlashState((prev) => ({
        ...prev,
        open: true,
        vertical: 'top',
        horizontal: 'center',
      }));
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFlashState({ ...flash, open: false });
    setTimeout(() => {
      dispatch(
        clearFlashMessage({
          type: '',
          message: '',
        }),
      );
    }, 300);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        TransitionComponent={flash.Transition}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
