import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
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
  Button,
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
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  // const LoginSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .email('Электронная почта должна быть валидным адресом')
  //     .required('Электронная почта обязательна'),
  //   password: Yup.string().required('Пароль обязательный'),
  // });

  const formik = useFormik({
    initialValues: {
      desc: '',
      password: '',
      remember: true,
    },
    // validationSchema: LoginSchema,
    onSubmit: (data, { setSubmitting }) => {},
  });

  const { isSubmitting, handleSubmit, getFieldProps } = formik;


  const Input = styled('input')({
    display: 'none',
  });

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton color="primary" aria-label="upload picture" component="span" size="large">
              <PhotoCamera sx={{ width: '50%', height: '50%' }} />
            </IconButton>
          </label>
        </Stack>

        <Stack spacing={3}>
          <TextField
            id="outlined-multiline-static"
            label={t('report.textarea')}
            multiline
            rows={5}
            {...getFieldProps('desc')}
          />
        </Stack>

        <Stack
          spacing={3}
          direction="row
         "
          alignItems="left
      "
          justifyContent="space-between
"
          sx={{ my: 2, width: '30%' }}
        >
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t('report.form_button')}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
