import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { registrationUser } from '../../../store/ac/authAC';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Электронная почта должна быть валидным адресом').required('Электронная почта обязательна'),
    nickname: Yup.string().min(2, 'Слишком короткий ник').max(50, 'Слишком длинный ник').required('Никнейм обязательный'),
    password: Yup.string().min(6, 'Слишком короткий пароль').max(20, 'Слишком длинный пароль').required('Пароль обязательный'),
    password_confirm: Yup.string()
      .when('password', {
        is: (val) => !!(val && val.length > 0),
        then: Yup.string().oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
      })
      .required('Пароль обязательный'),
  });

  const formik = useFormik({
    initialValues: {
      nickname: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (data, { setSubmitting }) => {
      dispatch(registrationUser(data, navigate, setSubmitting));
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const styles = {
    helper: {
      position: 'absolute',
      bottom: '-17px',
    },
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="nickname"
            type="text"
            label={t('form.nickname')}
            {...getFieldProps('nickname')}
            error={Boolean(touched.nickname && errors.nickname)}
            helperText={touched.nickname && errors.nickname}
            FormHelperTextProps={{ style: styles.helper }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label={t('form.first_name')}
              {...getFieldProps('first_name')}
              error={Boolean(touched.first_name && errors.first_name)}
              helperText={touched.first_name && errors.first_name}
              FormHelperTextProps={{ style: styles.helper }}
            />

            <TextField
              fullWidth
              label={t('form.last_name')}
              {...getFieldProps('last_name')}
              error={Boolean(touched.last_name && errors.last_name)}
              helperText={touched.last_name && errors.last_name}
              FormHelperTextProps={{ style: styles.helper }}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label={t('form.email')}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            FormHelperTextProps={{ style: styles.helper }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label={t('form.password')}
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              FormHelperTextProps={{ style: styles.helper }}
            />

            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label={t('form.password_confirm')}
              {...getFieldProps('password_confirm')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password_confirm && errors.password_confirm)}
              helperText={touched.password_confirm && errors.password_confirm}
              FormHelperTextProps={{ style: styles.helper }}
            />
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            {t('form.register_submit')}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
