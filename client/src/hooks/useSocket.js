import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { setNewReportNotification } from '../store/ac/notificationAC';
import { setOnline } from '../store/ac/onlineUsersAc';
import { setSocket } from '../store/ac/socketAc';
import { addChatMessage, loadRooms } from '../store/ac/chatAc';
import { addUnreadMessage } from '../store/ac/unreadMessagesAC';
import { BASE_URL } from '../config/constants';

export default function useSocket(dispatch) {
  const socket = useRef();
  const user = useSelector((state) => state.user);
  const currentRoom = useSelector((state) => state.chat.room);
  const location = useLocation();

  useEffect(() => {
    try {
      if (user) {
        socket.current = io(BASE_URL, {
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
          if (msg.message.user_id !== user.id && location.pathname !== '/chats') {
            const audio = new Audio('/static/audio/icq.wav');
            audio.play();
            dispatch(addUnreadMessage());
          }
        });
        dispatch(setSocket(socket));
      }
    } catch (e) {
      console.log(e);
    }
    return () => socket?.current?.emit('logout');
  }, [user, dispatch, currentRoom, location]);

  return {
    socket,
  };
}
