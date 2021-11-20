import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, Chip, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ReportPreviousImages from '../ReportPreviousImages/ReportPreviousImages';
import { setNewReport } from '../../store/ac/reportsAC';

// ----------------------------------------------------------------------

export default function ReportForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [chipData, setChipData] = useState([]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    chipData.forEach((el, id) => formData.append(`photos`, el.files[id]));
    dispatch(setNewReport(formData));
  };

  const Input = styled('input')({
    display: 'none',
  });

  const fileUploadHandler = (e) => {
    const [file] = e.target.files;
    const src = URL.createObjectURL(file);

    for (const el of e.target.files) {
      if (el.type === 'image/png' || el.type === 'image/jpeg' || el.type === 'image/jpg') {
        setChipData((prev) => [...prev, { label: el.name, key: el.name, img: src, files: e.target.files }]);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
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
              <PhotoCamera sx={{ width: '50%', height: '50%' }} />
            </IconButton>
          </label>
          <ReportPreviousImages itemData={chipData} />
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ padding: '15px 0 15px 0' }}>
          {chipData.map((data) => {
            return (
              <ListItem key={data.key} sx={{ width: 'auto', padding: '0 0 15px 0' }}>
                <Chip
                  // icon={icon}
                  label={data.label}
                  onDelete={handleDelete(data)}
                />
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
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="left"
          justifyContent="space-between"
          sx={{ my: 2, width: '30%' }}
        >
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            // loading={isSubmitting}
          >
            {t('report.form_button')}
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
