import { visuallyHidden } from '@mui/utils';
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

export default function RecommendationsHead({ order, orderBy, headLabel }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel hideSortIcon active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
