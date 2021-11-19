import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { clearErrorMessage } from '../../store/ac/errorAC';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorMessage() {
  const [errorState, setErrorState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = errorState;

  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setErrorState({ ...errorState, open: true, vertical: 'top', horizontal: 'center' });
    }
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearErrorMessage());
    setErrorState({ ...errorState, open: false });
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
