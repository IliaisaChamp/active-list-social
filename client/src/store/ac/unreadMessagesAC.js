import {ADD_UNREAD_MESSAGES, RESET_UNREAD_MESSAGES} from '../types/unreadMessages';

export const addUnreadMessage = () => {

    return {
      type: ADD_UNREAD_MESSAGES,
    }
};

export const resetUnreadMessages = () => {
  return {
    type: RESET_UNREAD_MESSAGES,
  };
};
