import { ALL_USERS } from "../types/usersTypes";
import axios from "axios";
import { checkUser } from "./authAC";

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
    .catch((e) => console.log(e));
};
