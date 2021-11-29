import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Page from '../components/Page/Page';

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
