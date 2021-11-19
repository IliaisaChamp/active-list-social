import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Input,
  Chip,
  ListItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import { loginUser } from '../../../store/ac/authAC';

// ----------------------------------------------------------------------

export default function ReportForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [chipData, setChipData] = useState([]);
  const [files, setFiles] = useState([]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);

    files.forEach(el => formData.append(`photos`, el))
    // dispatch
  };

  const Input = styled('input')({
    display: 'none',
  });

  const fileUploadHandler = (e) => {
    setFiles((prev) => [...prev, ...e.target.files]);

    for (const el of e.target.files) {
      setChipData((prev) => [...prev, { label: el.name, key: el.name }]);
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
              name="files"
              onChange={fileUploadHandler}
              multiple="multiple"
            />
            <IconButton color="primary" aria-label="upload picture" component="span" size="large">
              <PhotoCamera sx={{ width: '50%', height: '50%' }} />
            </IconButton>
          </label>
        </Stack>

        <Stack direction="row" justifyContent="center" spacing={3}>
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
            // onClick={hendleClick}
            // loading={isSubmitting}
          >
            {t('report.form_button')}
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
