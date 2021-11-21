import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// mui
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

// icons
import AddIcon from '@mui/icons-material/Add';
import MessageIcon from '@mui/icons-material/Message';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

// mufunc

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: 'relative',
    height: '100px',
    marginBottom: 10,
  },
  header: {
    display: 'flex',
    position: 'absolute',
    width: 'calc(100%)',
    top: '-70px',
    alignItems: 'flex-end',
    '& > *': {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  },
  spacer: {
    flexGrow: '1',
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(20),
    height: theme.spacing(20),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: 'flex',
    // width: '330px',
    justifyContent: 'flex-end',
    marginRight: 0,
  },
  button: {
    marginRight: 10,
    '&:last-child': {
      margin: 0,
    },
  },
}));

const img =
  'https://images.unsplash.com/photo-1604737771065-7ce2dc4ba3e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1954&q=80';

const UserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const isSelfPage = +id === +user.id;

  const classes = useStyles();
  return (
    <div>
      <div
        style={{
          height: '200px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          filter: 'contrast(75%)',
          backgroundImage: `url(${img})`,
        }}
      />
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <Avatar
            alt={user.first_name}
            src={'http://localhost:3001/img/' + user.avatar}
            classes={{ root: classes.avatar, circle: classes.circle }}
          />
          <Typography variant={'h5'}>{user.first_name}</Typography>
          &nbsp;
          <Typography variant={'h5'}>{user.last_name}</Typography>
          <div className={classes.spacer} />
          <div className={classes.actionGroup}>
            {isSelfPage ? (
              <Button
                className={classes.button}
                onClick={() => navigate('/tasks')}
                variant="outlined"
                startIcon={<AddIcon />}>
                Добавить
              </Button>
            ) : (
              <>
                <Button className={classes.button} variant="outlined" startIcon={<SubscriptionsIcon />}>
                  Подписаться
                </Button>
                <Button className={classes.button} variant="outlined" startIcon={<MessageIcon />}>
                  Сообщение
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
