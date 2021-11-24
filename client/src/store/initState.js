const initState = {
  user: null,
  currentUser: null,
  currentUserSubscribes: [],
  profileStats: { tasksCount: 0, reportsCount: 0, userReportsCount: 0, userTasksCount: 0 },
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
