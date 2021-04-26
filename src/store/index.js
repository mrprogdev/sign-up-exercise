import { createStore } from "redux";
import Cookie from "js-cookie";

const auth = { token: "", checkSession: false };

const sessionReducer = (state = auth, action) => {
  if (action.type === "login") {
    return {
      token: "xyz",
      checkSession: true,
    };
  }

  if (action.type === "logout") {
    return {
      token: "",
      checkSession: false,
    };
  }

  return state;
};

const store = createStore(
  sessionReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //  used to check store state at chrome dev tools
);

export default store;
