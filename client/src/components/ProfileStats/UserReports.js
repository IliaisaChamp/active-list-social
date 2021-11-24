import { Icon } from '@iconify/react';
import bugFilled from '@iconify/icons-ant-design/bug-filled';
import userAdmin from '@iconify/icons-carbon/user-admin';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter,
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`,
}));

// ----------------------------------------------------------------------

export default function UserReports({ stat }) {
  const { t } = useTranslation();
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={userAdmin} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">
        <CountUp start={0} end={stat} delay={0.5} duration={2} />
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {t('pages.profile.stat.userreports')}
      </Typography>
    </RootStyle>
  );
}
