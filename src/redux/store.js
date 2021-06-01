import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import api from "../common/axios";

const reducers = combineReducers({
  auth: authReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  const {
    auth: { access_token },
  } = store.getState();
  if (access_token) {
    api.defaults.headers = `Bearer ${access_token}`;
  }
  // console.log("subscribe: ", access_token);
});

export default store;
