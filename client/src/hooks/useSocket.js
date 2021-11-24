import io from 'socket.io-client';
import { setNewReportNotification } from '../store/ac/notificationAC';
import { createSocketConnect, setOnline } from '../store/ac/onlineUsersAc';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import {setSocket} from "../store/ac/socketAc";

export default function useSocket(dispatch) {
  const socket = useRef();
  const user = useSelector((state) => state.user);

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
      dispatch(setSocket(socket));
    }
    return () => socket?.current?.emit('logout')
  }, [user, dispatch]);
  return {
    socket,
  };
}
