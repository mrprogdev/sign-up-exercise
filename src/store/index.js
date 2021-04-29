import { createStore } from "redux";
import Cookies from "js-cookie";
import axios from "axios";

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
  switch (action.type) {
    case "login":
      console.log("payload data: " + action.payload);
      Cookies.set("token", action.payload, { expires: 1 });
      return {
        token: Cookies.get("token"),
        checkSession: true,
      };
    case "logout":
      Cookies.remove("token");
      window.localStorage.removeItem("store");
      return {
        token: "",
        checkSession: false,
      };
    default:
      return state;
  }
};

const store = createStore(
  sessionReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //  used to check store state at chrome dev tools
);

store.subscribe(() => {
  console.log("redux Refreshed", store.getState);
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
  console.log("redux Refreshed", store.getState);
  axios
    .get(
      `https://5k9okv4iu0.execute-api.ap-southeast-1.amazonaws.com/production/account`,
      { headers: { Authorization: Cookies.get("token") } }
    )
    .then((response) => {
      console.log("Check if cookie is valid: " + response);
      //store.dispatch("login");
    })
    .catch((error) => {
      console.log("error " + error);
      //store.dispatch("logout");
    });
}); // on redux state changed save new state to localstorage

export default store;
