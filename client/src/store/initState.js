const initState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  tasks: [],
  possibleFriends: [],
  isLoading: 0,
  reports: [],
  currentReports: {},
};
export default initState;
