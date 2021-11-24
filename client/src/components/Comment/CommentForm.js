import { Link as RouterLink, useParams } from 'react-router-dom';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useInput from '../../hooks/useInput';
import { setComment } from '../../store/ac/reportsAC';
import Box from '@mui/material/Box';
import { usePickerState } from '@mui/lab/internal/pickers/hooks/usePickerState';
import { useState } from 'react';

function CommentForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [value, setValue] = useState();

  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get('text');

    dispatch(setComment(text.trim(), id));
    setValue('');
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Stack direction="row" flexWrap="wrap" justifyContent="flex-end">
          <TextField
            id="standard-multiline-static"
            sx={{ background: 'white' }}
            label={t('report.textarea')}
            multiline
            fullWidth
            rows={4}
            name="text"
            value={value}
            onChange={onChangeInput}
            variant="outlined"
            color="success"
          />

          <Stack sx={{ my: 2, width: '20%', ml: 2 }}>
            <LoadingButton size="medium" type="submit" variant="contained">
              {t('report.form_button')}
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </>
  );
}

export default function Container() {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '30px',
      }}>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{
          width: '70%',
          padding: '0 10px 0 10px',
        }}>
        <CommentForm />
      </Stack>
    </Box>
  );
}
