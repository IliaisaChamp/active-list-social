import {ADD_UNREAD_MESSAGES, RESET_UNREAD_MESSAGES} from '../types/unreadMessages';

const initState = 0;

function unreadMessagesReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_UNREAD_MESSAGES:
      return state + 1;
    case RESET_UNREAD_MESSAGES:
      return 0;
    default:
      return state;
  }
}

export default unreadMessagesReducer;
