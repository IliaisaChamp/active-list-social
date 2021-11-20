import { SET_REPORTS } from '../types/reportsTypes';
import axios from 'axios';
import { setErrorMessage, setSuccessMessage } from './flashAC';

const BASE_URL = 'http://localhost:3001/api';

export const setReports = () => async (dispatch) => {
  const response = await axios(`${BASE_URL}/reports`);
  const { reports } = response.data;
  dispatch({
    type: SET_REPORTS,
    payload: reports,
  });
};

export const setNewReport = (data, navigate) => async (dispatch) => {
  const reportData = {
    images: data.getAll('photos'),
    desc: data.get('desc'),
  };
  await axios
    .post(`${BASE_URL}/reports`, reportData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    })
    .then((res) =>
      dispatch(
        setSuccessMessage({
          message: 'Отчет успешно добавлен',
          type: 'success',
        }),
      ),
    )
    .catch(({ response }) =>
      dispatch(
        setErrorMessage({
          message: response.data.message,
          type: 'error',
        }),
      ),
    );
};
