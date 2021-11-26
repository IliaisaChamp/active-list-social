import React from 'react';
import { Grid, List, ListItemButton, ListItemText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { getSubsReports, getReports, setAllReports } from '../../store/ac/reportsAC';
import { startLoading } from '../../store/ac/isLoadingAC';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderLeft500: {
    borderLeft: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});

const RightSideLentaMenu = () => {
  const dispatch = useDispatch();

  const getOnlyUserReports = () => {
    dispatch(getReports());
  };

  const getAllReports = () => {
    dispatch(setAllReports());
  }

  const getOnlySubsReports = () => {
    dispatch(getSubsReports());
  };

  const classes = useStyles();
  return (
    <Grid item xs={3} className={classes.borderLeft500} sx={{ position: 'fixed', right: 10, top: '40%' }}>
      <List>
        <ListItemButton onClick={getOnlyUserReports}>
          <ListItemText>Отчеты для Вас</ListItemText>
        </ListItemButton>
        <ListItemButton onClick={getOnlySubsReports}>
          <ListItemText>Отчеты подписок</ListItemText>
        </ListItemButton>
        <ListItemButton onClick={getAllReports}>
          <ListItemText>Все отчеты</ListItemText>
        </ListItemButton>
      </List>
    </Grid>
  );
};

export default RightSideLentaMenu;
