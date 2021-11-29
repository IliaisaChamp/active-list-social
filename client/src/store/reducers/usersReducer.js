import {} from '../types/usersTypes';

export const usersReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
  default:
    return state;
  }
};

export default usersReducer;
