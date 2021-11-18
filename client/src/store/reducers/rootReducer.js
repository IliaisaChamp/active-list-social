import { combineReducers } from "redux";
import usersReducer from "./usersReducer"
import tasksReducer from "./tasksReducer"
import possibleFriendsReducer from "./possibleFriendsReducer"
import isLoadingReducer from "./isLoadingReducer"
import reportsReducer from "./reportsReducer"
import currentReportsReducer from "./currentReportsReducer"



const rootReducer = combineReducers({
  user: usersReducer,
  tasks: tasksReducer,
  possibleFriends: possibleFriendsReducer,
  isLoading: isLoadingReducer,
  reports: reportsReducer,
  uscurrentReports: currentReportsReducer,
});

export default rootReducer;
