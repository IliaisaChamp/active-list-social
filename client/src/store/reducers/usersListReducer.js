import {} from '../types/usersListTypes';

export const possibleFriendsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default possibleFriendsReducer;
