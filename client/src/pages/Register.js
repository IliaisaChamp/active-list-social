import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../layouts/AuthLayout';
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RegisterForm } from '../components/authentication/register';
import AuthSocial from '../components/authentication/AuthSocial';
import LanguagePopover from '../components/Header/LanguagePopover';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(() => ({
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

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <RootStyle title="Register | Minimal-UI">
      <AuthLayout>
        <Box display="flex" justifyContent="space-between" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }} sx={{ mb: 1 }}>
          <Button variant="outlined" onClick={() => navigate('/')} sx={{ maxHeight: 30 }}>
            {t('pages.auth.button')}
          </Button>
          <LanguagePopover />
        </Box>
        {t('pages.reg.q')}
        {' '}
&nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          {t('pages.reg.login')}
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <img alt="register" src="/static/illustrations/auth.png" style={{ objectFit: 'contain', height: '80%' }} />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {t('pages.reg.title')}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{t('pages.reg.sub')}</Typography>
          </Box>

          <AuthSocial />

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            {t('pages.reg.warning')}
            &nbsp;
            <Link href="#" underline="always" sx={{ color: 'text.primary' }}>
              {t('pages.reg.politic')}
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              {t('pages.reg.q')}
              {' '}
&nbsp;
              <Link to="/login" component={RouterLink}>
                {t('pages.reg.login')}
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
