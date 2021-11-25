import io from 'socket.io-client';
import { setNewReportNotification } from '../store/ac/notificationAC';
import { setOnline } from '../store/ac/onlineUsersAc';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setSocket } from '../store/ac/socketAc';
import { addChatMessage, loadRooms } from '../store/ac/chatAc';
import axios from 'axios';
import { addUnreadMessage } from '../store/ac/unreadMessagesAC';
import { useLocation } from 'react-router-dom';

export default function useSocket(dispatch) {
  const socket = useRef();
  const user = useSelector((state) => state.user);
  const currentRoom = useSelector((state) => state.chat.room);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      socket.current = io('http://localhost:3001', {
        query: { id: user.id },
      });

      socket.current.on('notification', (msg) => {
        dispatch(setNewReportNotification(msg.message));
      });

      socket.current.on('broadcast-online', (msg) => {
        dispatch(setOnline(msg.users));
      });

      socket.current.on('new-message', async (msg) => {
        await axios.put(`/api/rooms/${msg.room}`, { hasMessages: true });
        if (currentRoom === msg.room) {
          dispatch(addChatMessage(msg.message));
        } else {
          dispatch(loadRooms());
        }
        console.log('NAVIGATE', location);
        if (msg.message.user_id !== user.id && location.pathname !== '/chats') {
          let audio = new Audio('/static/audio/icq.wav');
          audio.play();
          dispatch(addUnreadMessage());
        }
      });
      dispatch(setSocket(socket));
    }
    return () => socket?.current?.emit('logout');
  }, [user, dispatch, currentRoom, location]);

  return {
    socket,
  };
}
