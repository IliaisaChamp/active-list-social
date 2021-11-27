import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Нет занятий
      </Typography>
    </Paper>
  );
}
