import {
  USER_SIGNIN,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNUP_FAILURE,
  USER_SIGNOUT,
} from "./type";
import api from "../common/axios";
import Cookies from "js-cookie";

export const userSigningIn = () => {
  return {
    type: USER_SIGNIN,
  };
};

export const userSignOut = () => {
  Cookies.remove("sessionid");
  api.defaults.headers = "";
  return {
    type: USER_SIGNOUT,
  };
};

export const userSignInSuccess = (access_token) => {
  return {
    type: USER_SIGNIN_SUCCESS,
    payload: access_token,
  };
};

export const userSignInFailure = (error) => {
  return {
    type: USER_SIGNIN_FAILURE,
    payload: error,
  };
};

export const userSignUpFailure = (error) => {
  return {
    type: USER_SIGNUP_FAILURE,
    payload: error,
  };
};

export const userLogin = (values) => {
  return (dispatch) => {
    dispatch(userSigningIn());
    return api
      .post(`/login`, values)
      .then((res) => {
        // console.log("values: ", values);
        const token = res.data.data.session;
        Cookies.set("sessionid", token, { expires: 1 });
        dispatch(userSignInSuccess(token));
        return true;
      })
      .catch((err) => {
        console.log("the error: ", err);
        const errorMessage = err.response.data.error;
        dispatch(userSignInFailure(errorMessage));
        return false;
      });
  };
};

export const userRegister = (values) => {
  return (dispatch) => {
    dispatch(userSigningIn());
    return api
      .post(`/register`, values)
      .then((res) => {
        // console.log("values: ", values);

        return true;
      })
      .catch((err) => {
        const errorMessage = err.response.data.error;
        dispatch(userSignInFailure(errorMessage));
        return false;
      });
  };
};

export const checkSesssion = () => {
  const AuthStr = "Bearer " + Cookies.get("sessionid");
  return (dispatch) => {
    api
      .get(`/account`, { headers: { Authorization: AuthStr } })
      .then((response) => {
        // console.log("Your Session: ", response);
        dispatch(userSignInSuccess(Cookies.get("sessionid")));
      })
      .catch((error) => {
        // console.log("error " + error);
        dispatch(userSignInFailure());
      });
  };
};
