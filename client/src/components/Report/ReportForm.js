import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, TextField, IconButton, Chip, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ReportPreviousImages from './ReportPreviousImages';
import { setNewReport } from '../../store/ac/reportsAC';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import { BASE_URL_API } from '../../config/constants';
import { startLoading, stopLoading } from '../../store/ac/isLoadingAC';
import Loader from '../Loader/Loader';

// ----------------------------------------------------------------------

export default function ReportForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { value, onChangeInput } = useInput();
  const [chipData, setChipData] = useState([]);
  const [task, setTask] = useState({});

  const { id } = useParams();
  const { user } = useSelector((state) => state);
  const isLoading = useSelector((state) => state.isLoading);

  const request = useCallback(async () => {
    dispatch(startLoading());
    try {
      const response = await axios(`${BASE_URL_API}/tasks/${id}`);
      const { task } = await response.data;
      setTask(task);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(stopLoading());
    }
  }, []);

  useEffect(() => {
    request();
  }, []);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.label !== chipToDelete.label));
  };
  const socket = useSelector((state) => state.socket);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    chipData.forEach((el, id) => formData.append(`photos`, ...el.files));

    dispatch(setNewReport(formData, id, user.id, navigate, socket));
  };

  const Input = styled('input')({
    display: 'none',
  });

  const fileUploadHandler = (e) => {
    for (const el of e.target.files) {
      if (el.type === 'image/png' || el.type === 'image/jpeg' || el.type === 'image/jpg') {
        const src = URL.createObjectURL(el);
        setChipData((prev) => [...prev, { label: el.name, img: src, files: e.target.files }]);
      }
    }
  };

  return (
    <>
      {isLoading > 0 ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            {task?.title}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack direction="row" alignItems="center" justifyContent="left" flexWrap="wrap" spacing={3}>
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  name="images"
                  onChange={fileUploadHandler}
                  multiple="multiple"
                />
                <IconButton color="primary" aria-label="upload picture" component="span" size="large">
                  <PhotoCamera sx={{ width: '100px', height: '100px' }} />
                </IconButton>
              </label>
              <ReportPreviousImages itemData={chipData} />
            </Stack>
            <Stack direction="row" justifyContent="center" flexWrap="wrap" sx={{ margin: '10px 0 10px 0', height: 50 }}>
              {chipData.map((data) => {
                return (
                  <ListItem key={data.label} sx={{ width: 'auto' }}>
                    <Chip label={data.label} onDelete={handleDelete(data)} />
                  </ListItem>
                );
              })}
            </Stack>

            <Stack>
              <TextField
                id="outlined-multiline-static"
                label={t('report.textarea')}
                multiline
                rows={5}
                name="desc"
                value={value.desc}
                onChange={onChangeInput}
              />
            </Stack>

            <Stack direction="row" alignItems="left" justifyContent="space-between" sx={{ my: 2, width: '30%' }}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained">
                {t('report.form_button')}
              </LoadingButton>
            </Stack>
          </form>
        </>
      )}
    </>
  );
}
