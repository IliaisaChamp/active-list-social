import React from 'react';
import { useSelector } from 'react-redux';
// mui
import { Container, Card, TableContainer, Table, TableHead, TableBody } from '@mui/material';

import Scrollbar from '../Scrollbar/Scrollbar';
import SubscribesItem from '../SubscribesItem/SubscribesItem';
import SubscribesHead from '../SubscribesHead/SubscribesHead';

const SubscribesList = ({ userSubscribes, unsubcsribeFromUser, isSelfPage }) => {
  const onlineUsers = useSelector((state) => state.onlineUsers);

  return (
    <Container>
      <Card sx={{ maxWidth: 800, margin: 'auto' }}>
        <Scrollbar>
          <TableContainer>
            <Table>
              <TableHead>
                <SubscribesHead isSelfPage={isSelfPage} />
              </TableHead>
              <TableBody>
                {userSubscribes.map((user) => (
                  <SubscribesItem
                    key={user.id}
                    userInfo={user}
                    unsubcsribeFromUser={unsubcsribeFromUser}
                    isOnline={onlineUsers.includes(user.id.toString())}
                    isSelfPage={isSelfPage}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Container>
  );
};

export default SubscribesList;
