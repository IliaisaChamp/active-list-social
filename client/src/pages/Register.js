import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RegisterForm } from '../components/authentication/register';
import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 660,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // borderRadius: 0,
  // margin: theme.spacing(0, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="Register | Minimal-UI">
      <AuthLayout>
        Уже есть аккаунт? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Войти
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          {/* <Box sx={{ borderRadius: '10px' }}> */}
            <img
              alt="register"
              src="/static/illustrations/6619759.jpg"
              style={{ objectFit: 'contain', height: '80%' }}
            />
          {/* </Box> */}
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Начни абсолютно бесплатно.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Бесплатно навсегда. Кредитная карта не требуется.
            </Typography>
          </Box>

          <AuthSocial />

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            Регистрируясь, я принимаю&nbsp;
            {/* <Link underline="always" sx={{ color: 'text.primary' }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp; */}
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Политику конфиденциальности
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Уже есть аккаунт? &nbsp;
              <Link to="/login" component={RouterLink}>
                Войти
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
