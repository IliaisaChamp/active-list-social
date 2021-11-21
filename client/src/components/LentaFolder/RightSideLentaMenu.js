import { Avatar, Container, Divider, Fab, Grid, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@mui/material'

import { makeStyles } from '@mui/styles';


import React from 'react'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderLeft500: {
      borderLeft: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const RightSideLentaMenu = () => {
  const classes = useStyles();
  return (
    <Grid item xs={3} className={classes.borderLeft500} sx={{ position: 'fixed', right: 0, top: '40%'}}>
    <List >
        <ListItemButton>
            <ListItemText>Отчеты для Вас</ListItemText>
        </ListItemButton>
        <ListItemButton>
            <ListItemText>Отчеты подписок</ListItemText>
        </ListItemButton>
        <ListItemButton>
            <ListItemText>Случайные отчеты</ListItemText>
        </ListItemButton>
    </List>
</Grid>
  )
}

export default RightSideLentaMenu
