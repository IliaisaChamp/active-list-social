const initState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  currentUser: null,
  flash: { message: '', type: '' },
  notification: { message: '', url: '' },
  tasks: [],
  possibleFriends: [],
  isLoading: 0,
  reports: [],
  currentReport: {},
  online: [],
};
export default initState;
