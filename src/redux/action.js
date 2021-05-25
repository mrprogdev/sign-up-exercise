import { USER_SIGNIN, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE } from "./type";
import api from "../common/axios";

export const userSigningIn = () => {
  return {
    type: USER_SIGNIN,
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

export const userLogin = (values) => {
  return (dispatch) => {
    dispatch(userSigningIn());
    api
      .post(`/login`, values)
      .then((res) => {
        console.log("values: ", values);
        const token = res.data.data.session;
        dispatch(userSignInSuccess(token));
      })
      .catch((err) => {
        const errorMessage = err.response.data.error;
        dispatch(userSignInFailure(errorMessage));
      });
  };
};
