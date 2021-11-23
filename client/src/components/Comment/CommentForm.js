import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useInput from '../../hooks/useInput';
import {setComment} from '../../store/ac/reportsAC'
import Box from '@mui/material/Box';

function CommentForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { value, onChangeInput } = useInput();

  const { id } = useParams();
  const { currentReport, user } = useSelector((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get('text')

    dispatch(setComment(text.trim(), id));
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Stack direction="row" alignItems="left">
          <TextField
            id="standard-multiline-static"
            sx={{ background: 'white' }}
            label={t('report.textarea')}
            multiline
            fullWidth
            rows={3}
            name="text"
            value={value.text}
            onChange={onChangeInput}
            variant="outlined"
            color="secondary"
          />

          <Stack sx={{ my: 2, width: '20%', ml: 2 }}>
            <LoadingButton size="large" type="submit" variant="contained">
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
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{
          width: '70%',
          position: 'fixed',
          bottom: 10,
          right: 0,
          padding: '0 10px 0 10px',
        }}
      >
        <CommentForm />
      </Stack>
    </Box>
  );
}
