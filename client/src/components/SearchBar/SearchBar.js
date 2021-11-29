import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import { styled } from '@mui/material/styles';
import { Box, Toolbar, OutlinedInput, InputAdornment } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(() => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  paddingLeft: 0,
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: '1px !important',
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

export default function SearchBar({ filterName, onFilterName }) {
  return (
    <RootStyle>
      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder="Поиск цели"
        startAdornment={(
          <InputAdornment position="start">
            <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        )}
      />
    </RootStyle>
  );
}
