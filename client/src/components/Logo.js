import { Box } from '@mui/material';

// ----------------------------------------------------------------------


export default function Logo({ sx }) {
  return <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />;
}
