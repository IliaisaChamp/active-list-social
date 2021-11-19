import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import { clearErrorMessage } from '../../store/ac/errorAC';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorMessage() {
  const [errorState, setErrorState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    Transition: Slide,
  });

  const { vertical, horizontal, open } = errorState;

  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setErrorState({
        ...errorState,
        open: true,
        vertical: 'top',
        horizontal: 'center',
      });
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorState({ ...errorState, open: false });
    setTimeout(() => {
      dispatch(clearErrorMessage());
    }, 300);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        TransitionComponent={errorState.Transition}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
