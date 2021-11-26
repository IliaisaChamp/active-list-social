import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Button } from '@mui/material';
import AuthLayout from '../layouts/AuthLayout';
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
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <RootStyle title={t('pages.auth.head')}>
      <AuthLayout>
        <Box display="flex" justifyContent="space-between" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }} sx={{ mb: 1 }}>
          <Button variant="outlined" onClick={() => navigate('/')} sx={{maxHeight: 30}}>
            {t('pages.auth.button')}
          </Button>
          <LanguagePopover />
        </Box>
        {t('pages.auth.q')} &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          {t('pages.auth.create')}
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <img src="/static/illustrations/auth.png" alt="login" style={{ objectFit: 'contain', height: '80%' }} />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4">{t('pages.auth.title')}</Typography>
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
