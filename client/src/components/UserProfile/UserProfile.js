import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// mui
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Button, Typography, Stack, IconButton } from '@mui/material';

// icons
import AddIcon from '@mui/icons-material/Add';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MessageIcon from '@mui/icons-material/Message';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

// mufunc
import { changeAvatar } from '../../store/ac/usersAC';
import { Box } from '@mui/system';
import { getCurrentUser } from '../../store/ac/currentUserAC';

const BASE_URL = 'http://localhost:3001/img';

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

const InputFile = styled('input')({
  display: 'none',
});

const img =
  'https://images.unsplash.com/photo-1604737771065-7ce2dc4ba3e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1954&q=80';

const UserProfile = ({ isSelfPage }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleFileInputChange = async (e) => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    dispatch(changeAvatar(user?.id, formData));
  };
  useEffect(() => {
    if (!isSelfPage) {
      dispatch(getCurrentUser(id));
    }
  }, []);

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
          <Box sx={{ position: 'relative', mr: 6 }}>
            <Avatar
              alt={isSelfPage ? user.first_name : currentUser?.first_name}
              // src={user?.avatar && `${BASE_URL}/${user.avatar}`}
              src={
                isSelfPage
                  ? user?.avatar && `${BASE_URL}/${user.avatar}`
                  : currentUser?.avatar && `${BASE_URL}/${currentUser.avatar}`
              }
              classes={{ root: classes.avatar, circle: classes.circle }}
            />
            {isSelfPage && (
              <Stack
                sx={{
                  left: '70%',
                  bottom: '5%',
                  position: 'absolute',
                  zIndex: 4,
                }}
                direction="row"
                alignItems="center"
                spacing={2}>
                <label htmlFor="icon-button-file">
                  <InputFile
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    name="avatar"
                    onChange={handleFileInputChange}
                  />
                  <IconButton color="primary" aria-label="upload picture" component="span" size="large">
                    <PhotoCamera sx={{ width: '100%', height: '100%' }} />
                  </IconButton>
                </label>
              </Stack>
            )}
          </Box>
          <Typography variant={'h5'}>{isSelfPage ? user?.first_name : currentUser?.first_name}</Typography>
          &nbsp;
          <Typography variant={'h5'}>{isSelfPage ? user?.last_name : currentUser?.last_name}</Typography>
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
