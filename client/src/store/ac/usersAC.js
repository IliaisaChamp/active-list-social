import { ALL_USERS } from "../types/usersTypes";
import axios from "axios";
import { checkUser } from "./authAC";
import { setErrorMessage } from "./errorAC";

export const changeAvatar = (userId, formData) => (dispatch) => {
  axios
    .put(`api/users/${userId}`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(checkUser());
      }
    })
    .catch((e) => {
      console.dir(e);
      if (e.response.data.message) {
        dispatch(setErrorMessage(e.response.data.message));
      }
    });
};
