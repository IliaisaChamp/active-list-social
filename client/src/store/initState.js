const initState = {
  user: null,
  currentUser: null,
  currentUserSubscribes: [],
  flash: { message: '', type: '' },
  notification: { message: '', url: '' },
  tasks: [],
  subscribes: [],
  usersList: [],
  isLoading: 0,
  reports: [],
  currentReport: {},
  onlineUsers: [],
  socket: null,
};
export default initState;
