import { createStore } from "redux";
import Cookies from "js-cookie";

const auth = { token: Cookies.get("token"), checkSession: false };

function saveToLocalStorage(store) {
  // Use to persist store data even on refresh page
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem("store", serializedStore);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  // Use to persist store data even on refresh page
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const sessionReducer = (state = auth, action) => {
  if (action.type === "login") {
    return {
      token: Cookies.get("token"),
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
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //  used to check store state at chrome dev tools
);

store.subscribe(() => saveToLocalStorage(store.getState())); // on redux state changed save new state to localstorage

export default store;
