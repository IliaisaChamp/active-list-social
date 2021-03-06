import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Button, Typography, Stack, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MessageIcon from '@mui/icons-material/Message';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { Box } from '@mui/system';
import { changeAvatar } from '../../store/ac/usersAC';
import useChat from '../../hooks/useChat';
import { BASE_URL_AVATAR } from '../../config/constants';

//--------------------------------------------------------------------------

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
    border: '3px solid white',
    width: theme.spacing(20),
    height: theme.spacing(20),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: 'flex',
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

//--------------------------------------------------------------------------

const img = '/static/bgprofile.jpeg';

function UserProfile({ isSelfPage, subcsribeOnUser }) {
  const navigate = useNavigate();
  const openChat = useChat();
  const user = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.currentUser);
  const subscribes = useSelector((state) => state.subscribes);
  const dispatch = useDispatch();
  const { id } = useParams();
  const isSubscribed = subscribes.filter((sub) => +sub.id === +id).length > 0;
  const { t } = useTranslation();
  const classes = useStyles();

  const handleFileInputChange = async (e) => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    dispatch(changeAvatar(user?.id, formData));
  };

  const messageHandler = () => {
    const recipientId = id;
    openChat(recipientId);
  };

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
              src={
                isSelfPage
                  ? user?.avatar && `${BASE_URL_AVATAR}/${user.avatar}`
                  : currentUser?.avatar && `${BASE_URL_AVATAR}/${currentUser.avatar}`
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
                spacing={2}
              >
                {/* eslint-disable-next-line */}
                <label htmlFor="icon-button-file">
                  <InputFile accept="image/*" id="icon-button-file" type="file" name="avatar" onChange={handleFileInputChange} />
                  <IconButton color="primary" aria-label="upload picture" component="span" size="large">
                    <PhotoCamera sx={{ width: '100%', height: '100%' }} />
                  </IconButton>
                </label>
              </Stack>
            )}
          </Box>
          <Typography variant="h5">{isSelfPage ? user?.first_name : currentUser?.first_name}</Typography>
          &nbsp;
          <Typography variant="h5">{isSelfPage ? user?.last_name : currentUser?.last_name}</Typography>
          <div className={classes.spacer} />
          <div className={classes.actionGroup}>
            {isSelfPage ? (
              <Button className={classes.button} onClick={() => navigate('/tasks')} variant="outlined" startIcon={<AddIcon />}>
                {t('pages.profile.add')}
              </Button>
            ) : (
              <>
                {!isSubscribed && (
                  <Button
                    className={classes.button}
                    variant="outlined"
                    startIcon={<SubscriptionsIcon />}
                    onClick={() => subcsribeOnUser(user.id, id)}
                  >
                    {t('pages.profile.sub')}
                  </Button>
                )}
                <Button onClick={messageHandler} className={classes.button} variant="outlined" startIcon={<MessageIcon />}>
                  {t('pages.profile.message')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
