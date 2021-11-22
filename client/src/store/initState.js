const initState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  currentUser: null,
  flash: { message: '', type: '' },
  notification: { message: '', url: '' },
  tasks: [],
  possibleFriends: [],
  isLoading: 1,
  reports: [],
  currentReport: {},
};
export default initState;
