import axios from 'axios';
import { AUTH_USER_REGISTRATION, AUTH_USER_LOGOUT, AUTH_USER_LOGIN } from '../types/authTypes';
import { setErrorMessage } from './errorAC';

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

const deleteUser = () => {
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
      navigate(`/`);
    })
    .catch(({ response }) => {
      dispatch(setErrorMessage(response.data.message));
      setSubmitting(false);
    });
};

export const registrationUser = (data, navigate, setSubmitting) => async (dispatch) => {
  axios
    .post('/api/auth/registration', data)
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(setUser(res.data.user));
      navigate(`/profile`);
    })
    .catch(({ response }) => {
      dispatch(setErrorMessage(response.data.message));
      setSubmitting(false)
    });
};

export const logoutUser = (navigate) => async (dispatch) => {
  axios('/api/auth/logout')
    .then((res) => {
      localStorage.removeItem('user');
      dispatch(deleteUser());
      navigate('/profile');
    })
    .catch(({ response }) => console.log(response.data.message));
};

export const checkUser = () => async (dispatch) => {
  axios('/api/auth/check')
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user));
      console.log(res.data.user)
      dispatch(setUser(res.data.user));
    })
    .catch((e) => {
      console.log(e);
      dispatch(deleteUser());
    });
};
