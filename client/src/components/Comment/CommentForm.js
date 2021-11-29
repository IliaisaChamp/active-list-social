import { useParams } from 'react-router-dom';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { setComment } from '../../store/ac/reportsAC';

//-----------------------------------------------------------------------

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
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Stack direction="row" flexWrap="wrap" justifyContent="flex-end">
        <TextField
          id="standard-multiline-static"
          sx={{ background: 'white' }}
          label="Комментарий"
          multiline
          fullWidth
          rows={4}
          name="text"
          value={value}
          onChange={onChangeInput}
          variant="outlined"
        />

        <Stack sx={{ my: 2, width: '20%', ml: 2 }}>
          <LoadingButton size="medium" type="submit" variant="contained">
            {t('report.form_button')}
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
}

export default function Container() {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '30px',
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{
          width: '70%',
          padding: '0 10px 0 10px',
        }}
      >
        <CommentForm />
      </Stack>
    </Box>
  );
}
