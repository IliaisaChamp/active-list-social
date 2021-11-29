import { ADD_UNREAD_MESSAGES, RESET_UNREAD_MESSAGES } from '../types/unreadMessages';

export const addUnreadMessage = () => ({
  type: ADD_UNREAD_MESSAGES,
});

export const resetUnreadMessages = () => ({
  type: RESET_UNREAD_MESSAGES,
});
