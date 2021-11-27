import { useEffect, useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
// components
import MenuPopover from '../MenuPopover/MenuPopover';
import { changeLanguage } from 'i18next';
import useLocalStorage from '../../hooks/useLocalStorage';
// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'ru',
    label: 'Russia',
    icon: '/static/icons/ic_flag_ru.svg',
  },
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/ic_flag_en.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/static/icons/ic_flag_fr.svg',
  },
  {
    value: 'korean',
    label: 'Korean',
    icon: '/static/icons/Flag_of_South_Korea.png',
  },
  {
    value: 'buryat',
    label: 'Buryatia',
    icon: '/static/icons/ic_flag_ru.svg',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(0);
  const [storedValue, setValue] = useLocalStorage('lg', { lang: 'ru', id: 0 });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleChangeLanguage(storedValue?.lang, storedValue?.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeLanguage = (lang, id) => {
    console.log(lang);
    changeLanguage(lang);
    setValue('ru');
    setIcon(id);
    setValue({ lang, id });
    handleClose();
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={LANGS[icon]?.icon} alt={LANGS[icon]?.label} />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {LANGS.map((option, id) => (
            <MenuItem
              key={option?.value}
              selected={option?.value === LANGS[icon]?.value}
              onClick={() => handleChangeLanguage(option.value, id)}
            >
              <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} sx={{ width: 44, height: 20}}/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
