import { USER_SIGNIN, USER_SIGNIN_FAILURE, USER_SIGNIN_SUCCESS } from "./type";

const initialState = {
  loading: false,
  is_logged_in: false,
  access_token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        is_logged_in: true,
        access_token: action.payload,
      };
    case USER_SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        is_logged_in: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
