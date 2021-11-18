import { combineReducers } from "redux";
import tasksReducer from "./tasksReducer"
import possibleFriendsReducer from "./possibleFriendsReducer"
import isLoadingReducer from "./isLoadingReducer"
import reportsReducer from "./reportsReducer"
import currentReportsReducer from "./currentReportsReducer"
import authReducer from "./authReducer";



const rootReducer = combineReducers({
  user: authReducer,
  tasks: tasksReducer,
  possibleFriends: possibleFriendsReducer,
  isLoading: isLoadingReducer,
  reports: reportsReducer,
  uscurrentReports: currentReportsReducer,
});

export default rootReducer;
