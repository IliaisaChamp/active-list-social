import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader'

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function Layout() {
  const [open, setOpen] = useState(false);
  const isLoading = useSelector((state) => state.isLoading)
  return (
    <RootStyle>
      <Header onOpenSidebar={() => setOpen(true)} />
      <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        {
          isLoading ?
            <Loader/>

        :  
        <Outlet />
        }
      </MainStyle>
    </RootStyle>
  );
}
