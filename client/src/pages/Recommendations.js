import React from 'react';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Table, Typography, TableBody, Container, TableContainer } from '@mui/material';
import Page from '../components/Page/Page';
import Scrollbar from '../components/Scrollbar/Scrollbar';
import Loader from '../components/Loader/Loader';
import RecommendationsHead from '../components/RecommendationsHead/RecommentationsHead';
import { getRecommendedUsers, setUsersList } from '../store/ac/usersListAC';
import RecommendationItem from '../components/RecommendationItem/RecommendationItem';
import { isSubscribed } from '../utils/isSubscribed';
import { getSubsribes, setSubscribes, subscribeOnUser, unsubscribeFromUser } from '../store/ac/subscribesAC';
import { useTranslation } from 'react-i18next';

const Recommendations = () => {
  const user = useSelector((state) => state.user);
  const usersList = useSelector((state) => state.usersList);
  const onlineUsers = useSelector((state) => state.onlineUsers);
  const subscribes = useSelector((state) => state.subscribes);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const TABLE_HEAD = [
    { id: 'name', label: `${t('pages.recommend.header.name')}`, alignRight: false },
    { id: 'nickName', label: `${t('pages.recommend.header.percent')}`, alignRight: false },
    { id: 'rang', label: `${t('pages.recommend.header.reports')}`, alignRight: false },
    { id: 'status', label: `${t('pages.recommend.header.status')}`, alignRight: false },
  ];

  useEffect(() => {
    dispatch(getSubsribes(user?.id));
    dispatch(getRecommendedUsers());
    return () => {
      dispatch(setSubscribes([]));
      dispatch(setUsersList([]));
    };
  }, []);

  const subcsribeHandler = useCallback(
    (userId, followingsId) => {
      dispatch(subscribeOnUser(userId, followingsId));
    },
    [dispatch],
  );

  const unsubcsribeHandler = useCallback(
    (userId, followingsId) => {
      dispatch(unsubscribeFromUser(userId, followingsId));
    },
    [dispatch],
  );
  return (
    <Page title={t('pages.recommend.head')}>
      {isLoading > 0 ? (
        <Loader />
      ) : (
        <>
          <Typography align="center" variant="h4" sx={{ mb: 5 }}>
            {t('pages.recommend.title')}
          </Typography>
          <Container maxWidth="xl">
            <Card sx={{ maxWidth: 800, margin: 'auto' }}>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <RecommendationsHead headLabel={TABLE_HEAD} />
                    <TableBody>
                      {usersList.map((user) => (
                        <RecommendationItem
                          key={user.id}
                          userInfo={user}
                          subcsribeHandler={subcsribeHandler}
                          unsubcsribeHandler={unsubcsribeHandler}
                          isOnline={onlineUsers.includes(user.id.toString())}
                          isSubscribed={isSubscribed(subscribes, user.id)}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Container>
        </>
      )}
    </Page>
  );
};

export default Recommendations;
