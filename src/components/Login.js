import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import { useState, useEffect } from "react";
import { Card } from "./Card";
import axios from "axios";
import { useHistory, useParams, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import Button from "./UI/Button";

const Login = () => {
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.checkSession);

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Required"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .max(30, " Must be less than 30 characters or less")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("password is required"),
  });

  if (isLogin) return <Redirect to="/" />;

  return (
    <Card>
      <Formik
        initialValues={{
          email: "bb@cc.com",
          password: "abcd3fgh",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          setIsPending(false);
          setIsError(false);
          console.log(values);
          //set timeout to see loading button take effect
          axios({
            method: "post",
            url: `https://5k9okv4iu0.execute-api.ap-southeast-1.amazonaws.com/production/login`,
            headers: {},
            data: values,
          })
            .then((response) => {
              console.log(response.data.data.session);
              localStorage.setItem("token", response.data.data.session);
              setIsPending(true);
              console.log(response);

              Cookies.set("token", response.data.data.session, { expires: 1 });
              dispatch({ type: "login" });
              history.push({
                pathname: "/",
              });
            })
            .catch((error) => {
              setIsError(true);
              setIsPending(true);
              console.log(error);
            });
        }}
      >
        {(formik) => (
          <div>
            <h1 className="my-4 font-weight-bold .display-4">Login</h1>
            <Form>
              {isError && <p>Username or password is wrong!</p>}
              <TextField label="Email" name="email" type="text" />
              <TextField label="Password" name="password" type="text" />
              <Button isLoading={!isPending}>Sign In</Button>
            </Form>
          </div>
        )}
      </Formik>
    </Card>
  );
};

export default Login;
