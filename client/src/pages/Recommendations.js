import React from 'react';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material
import { Card, Table, Typography, TableBody, Container, TableContainer } from '@mui/material';

// components
import Page from '../components/Page/Page';
import Scrollbar from '../components/Scrollbar/Scrollbar';
//
import RecommendationsHead from '../components/RecommendationsHead/RecommentationsHead';
import { getRecommendedUsers, setUsersList } from '../store/ac/usersListAC';
import RecommendationItem from '../components/RecommendationItem/RecommendationItem';

import { isSubscribed } from '../utils/isSubscribed';
import { getSubsribes, setSubscribes, subscribeOnUser, unsubscribeFromUser } from '../store/ac/subscribesAC';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'nickName', label: 'Percents', alignRight: false },
  { id: 'rang', label: 'Reports', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  // { id: '' },
];

const Recommendations = () => {
  const user = useSelector((state) => state.user);
  const usersList = useSelector((state) => state.usersList);
  const onlineUsers = useSelector((state) => state.onlineUsers);
  const subscribes = useSelector((state) => state.subscribes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubsribes(user.id));
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
    [dispatch]
  );

  const unsubcsribeHandler = useCallback(
    (userId, followingsId) => {
      dispatch(unsubscribeFromUser(userId, followingsId));
    },
    [dispatch]
  );
  return (
    <Page title="Подписки">
      <Typography align="center" variant="h4" sx={{ mb: 5 }}>
        Список рекомендуемых пользователей
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
    </Page>
  );
};

export default Recommendations;
