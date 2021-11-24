import axios from 'axios';
import { AUTH_USER_REGISTRATION, AUTH_USER_LOGOUT, AUTH_USER_LOGIN } from '../types/authTypes';
import { IS_LOADING, STOP_LOADING } from '../types/isLoadingTypes';
import { setErrorMessage } from './flashAC';
import { startLoading, stopLoading } from './isLoadingAC';

const setUser = (value) => {
  return {
    type: AUTH_USER_REGISTRATION,
    payload: value,
  };
};
const setUserAfterLogin = (value) => {
  return {
    type: AUTH_USER_LOGIN,
    payload: value,
  };
};

export const deleteUser = () => {
  return {
    type: AUTH_USER_LOGOUT,
  };
};

export const loginUser = (data, navigate, setSubmitting) => async (dispatch) => {
  axios
    .post('/api/auth/login', data)
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(setUserAfterLogin(res.data.user));
      navigate(`/profile/${res.data.user.id}`);
    })
    .catch(({ response }) => {
      dispatch(
        setErrorMessage({
          type: 'error',
          message: response?.data?.message ? response.data.message : 'Непредвиденная ошибка',
        }),
      );
      setSubmitting(false);
    });
};

export const registrationUser = (data, navigate, setSubmitting) => async (dispatch) => {
  axios
    .post('/api/auth/registration', data)
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(setUser(res.data.user));
      navigate(`/profile/${res.data.user.id}`);
    })
    .catch(({ response }) => {
      dispatch(
        setErrorMessage({
          type: 'error',
          message: response?.data?.message ? response.data.message : 'Непредвиденная ошибка',
        }),
      );
      setSubmitting(false);
    });
};

export const logoutUser = (navigate) => async (dispatch, getState) => {
  const { socket } = getState();
  axios('/api/auth/logout')
    .then((res) => {
      socket?.current?.emit('logout');
      localStorage.removeItem('user');
      // socket?.current?.disconnect();
      dispatch(deleteUser());
      navigate('/');
    })
    .catch((err) => {
      socket?.current?.emit('logout');
      console.log('error in logout');
      // socket?.current?.disconnect();
      console.log(err);
    });
};

export const checkUser = () => async (dispatch) => {
  dispatch(startLoading());
  axios('/api/auth/check')
    .then((res) => {
      console.log('dispatch checkUser');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(setUser(res.data.user));
    })
    .catch((e) => {
      console.log(e);
      dispatch(deleteUser());
    })
    .finally(() => dispatch(stopLoading()));
};
