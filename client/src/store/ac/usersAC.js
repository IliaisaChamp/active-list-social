import { ALL_USERS } from '../types/usersTypes';
import axios from 'axios';
import { checkUser } from './authAC';
import { setErrorMessage, setSuccessMessage } from './flashAC';

export const changeAvatar = (userId, formData) => (dispatch) => {
  axios
    .put(`api/users/${userId}`, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(checkUser());
        dispatch(
          setSuccessMessage({
            message: 'Аватар успешно загружен',
            type: 'success',
          }),
        );
      }
    })
    .catch((e) => {
      console.dir(e);
      if (e.response.data.message) {
        dispatch(
          setErrorMessage({
            message: e.response.data.message,
            type: 'error',
          }),
        );
      }
    });
};
