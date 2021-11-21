const initState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  flash: {message: '', type: ''},
  notification: { message: '', url: '' },
  tasks: [],
  possibleFriends: [],
  isLoading: 0,
  reports: [],
  currentReport: {},
};
export default initState;
