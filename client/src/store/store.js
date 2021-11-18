import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import initState from "./initState";

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
