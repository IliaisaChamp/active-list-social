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
        })
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
        })
      );
      setSubmitting(false);
    });
};

export const logoutUser = (navigate) => async (dispatch, getState) => {
  axios('/api/auth/logout')
    .then((res) => {
      localStorage.removeItem('user');
      const { socket } = getState();
      socket.current.disconnect();
      dispatch(deleteUser());
      navigate('/');
    })
    .catch((err) => console.log(err));
};

export const checkUser = () => async (dispatch, getState) => {
  axios('/api/auth/check')
    .then((res) => {
      dispatch(startLoading());
      console.log('dispatch checkUser');
      const { user } = getState();
      // if (Number(res.data.user.id) !== user.id) {
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(setUser(res.data.user));
      // }
    })
    .catch((e) => {
      console.log(e);
      dispatch(deleteUser());
      dispatch(startLoading());
    })
    .finally(() => dispatch(stopLoading()));
};
