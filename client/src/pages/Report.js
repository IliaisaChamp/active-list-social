import { Container } from '@mui/material';
import Page from '../components/Page/Page';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function Report() {
  const { t } = useTranslation();

  return (
    <Page title={t('report.head')}>
      <Container>
        <Outlet />
      </Container>
    </Page>
  );
}
