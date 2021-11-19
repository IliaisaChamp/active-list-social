const initState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null,
  notification: {message: '', url: ''},
  tasks: [],
  possibleFriends: [],
  isLoading: 0,
  reports: [],
  currentReports: {},
};
export default initState;
