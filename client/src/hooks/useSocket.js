import io from 'socket.io-client';
import { setNewReportNotification } from '../store/ac/notificationAC';
import { createSocketConnect, setOnline } from '../store/ac/onlineUsersAc';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setSocket } from '../store/ac/socketAc';
import {addChatMessage, loadRooms} from '../store/ac/chatAc';

export default function useSocket(dispatch) {
  const socket = useRef();
  const user = useSelector((state) => state.user);
  const currentRoom = useSelector((state) => state.chat.room);

  useEffect(() => {
    if (user) {
      socket.current = io('http://localhost:3001', {
        query: { id: user.id },
      });

      socket.current.on('notification', (msg) => {
        console.log('NOTIFICATION', msg);
        dispatch(setNewReportNotification(msg.message));
      });

      socket.current.on('broadcast-online', (msg) => {
        console.log('USERS ONLINE', msg);
        dispatch(setOnline(msg.users));
      });

      socket.current.on('new-message', (msg) => {
        console.log('SOCKETS')
        console.log(msg.message)
        if (currentRoom === msg.room) {
          dispatch(addChatMessage(msg.message));
        } else {
          dispatch(loadRooms());

        }
      });
      dispatch(setSocket(socket));
    }
    return () => socket?.current?.emit('logout');
  }, [user, dispatch, currentRoom]);

  return {
    socket,
  };
}
