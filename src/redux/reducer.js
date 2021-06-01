import {
  USER_SIGNIN,
  USER_SIGNIN_FAILURE,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_SIGNOUT,
} from "./type";

const initialState = {
  loading: true,
  buttonLoading: false,
  is_logged_in: false,
  access_token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN:
      return {
        ...state,
        buttonLoading: true,
        error: null,
      };
    case USER_SIGNOUT:
      return {
        loading: true,
        buttonLoading: false,
        is_logged_in: false,
        access_token: null,
        error: null,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        buttonLoading: false,
        is_logged_in: true,
        access_token: action.payload,
      };
    case USER_SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        buttonLoading: false,
        is_logged_in: false,
        error: action.payload,
      };
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        buttonLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
