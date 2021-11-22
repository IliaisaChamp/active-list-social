import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// material
import { styled } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar } from "@mui/material";

// components
import Logo from "../Logo/Logo";
import Scrollbar from "../Scrollbar/Scrollbar";
import NavSection from "../NavSection/NavSection";
import { MHidden } from "../../components/@material-extend";

// //sidebar icons
import peopleFill from "@iconify/icons-eva/people-fill";
import logInFill from "@iconify/icons-eva/log-in-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";
import flashOutLine from '@iconify/icons-eva/flash-outline'
import messageSquareFill from '@iconify/icons-eva/message-square-fill'
import rewindRightFill from '@iconify/icons-eva/rewind-right-fill'
import checkMarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill'
import starFill from '@iconify/icons-eva/star-fill'
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------
import { useTranslation } from 'react-i18next';

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
  const { t } = useTranslation();

  const sidebarConfig = [
    {
      title: t('sideBar.profile'),
      path: '/profile/:id',
      icon: getIcon(peopleFill),
      isAuth: true,
    },
    {
      title: t('sideBar.tasks'),
      path: '/tasks',
      icon: getIcon(checkMarkCircle2Fill),
      isAuth: true,
    },
    {
      title: t('sideBar.subscribe'),
      path: '/nearest',
      icon: getIcon(starFill),
      isAuth: true,
    },
    {
      title: t('sideBar.lenta'),
      path: '/timeline',
      icon: getIcon(rewindRightFill),
      isAuth: true,
    },
    {
      title: t('sideBar.chat'),
      path: '/chats',
      icon: getIcon(messageSquareFill),
      isAuth: true,
    },
    {
      title: t('sideBar.top'),
      path: '/top',
      icon: getIcon(flashOutLine),
      isAuth: true,
    },
    {
      title: t('sideBar.login'),
      path: '/login',
      icon: getIcon(logInFill),
      isAuth: false,
    },
    {
      title: t('sideBar.registration'),
      path: '/register',
      icon: getIcon(personAddFill),
      isAuth: false,
    },
    {
      title: t('sideBar.notFound'),
      path: '/404',
      icon: getIcon(alertTriangleFill),
      isAuth: true,
    },
  ];

  const { pathname } = useLocation();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: "inline-flex" }}>
          <Logo />
        </Box>
      </Box>
      {user && (
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none" component={RouterLink} to="#">
            <AccountStyle>
              <Avatar
                src={user.avatar ? `http://localhost:3001/img/${user.avatar}` : user.first_name}
                alt="userAvatar"
              />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {user.nickname}
                </Typography>
                {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography> */}
              </Box>
            </AccountStyle>
          </Link>
        </Box>
      )}

      <NavSection navConfig={sidebarConfig} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
