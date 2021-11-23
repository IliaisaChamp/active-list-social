import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';

import { useTranslation } from 'react-i18next';
import LanguagePopover from '../components/Header/LanguagePopover';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 660,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {

  const { t } = useTranslation()

  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout>
        <Box display="flex" justifyContent="right" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguagePopover />
        </Box>
        {t('pages.auth.q')} &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          {t('pages.auth.create')}
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography> */}
          <img
            src="/static/illustrations/6619759.jpg"
            alt="login"
            style={{ objectFit: 'contain', height: '80%' }}
          />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4">
              {t('pages.auth.title')}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{t('pages.auth.sub')}</Typography>
          </Box>
          <AuthSocial />

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              {t('pages.auth.q')} &nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                {t('pages.auth.create')}
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
