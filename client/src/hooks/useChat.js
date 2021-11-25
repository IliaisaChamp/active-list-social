import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openChat } from '../store/ac/chatAc';
import { startLoading, stopLoading } from '../store/ac/isLoadingAC';

function useChat() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (id) => {
    dispatch(startLoading());
    dispatch(openChat(id, t));
    navigate('/chats');
    dispatch(stopLoading());
  };
}

export default useChat;
