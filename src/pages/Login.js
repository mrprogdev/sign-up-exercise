import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/TextField";
import { useState } from "react";
import { Card } from "../components/UI/Card";
import { Redirect, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "../components/UI/Button";
import { userAuth } from "../components/axios";

const Login = () => {
  const [isPending, setIsPending] = useState(true); // for loading message on button when fetching data from API
  const [isError, setIsError] = useState(false); // for message error if login unsuccessful
  const [isErrorMessage, setIsErrorMessage] = useState(""); // for message error if login unsuccessful
  const history = useHistory();
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{7,}$/;

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Required"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .max(30, " Must be less than 30 characters or less")
      .matches(regex, "Must have atleast 1 alphabet and atleast 1 number")
      .required("password is required"),
  });

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
          userAuth
            .post("/login", values)
            .then((response) => {
              setIsPending(true);
              Cookies.set("token", "xyz");
              history.push("/");
            })
            .catch((error) => {
              setIsError(true);
              setIsPending(true);
              setIsErrorMessage(error.response.data.error);
            });
        }}
      >
        {(formik) => (
          <div>
            <h1 className="my-4 font-weight-bold .display-4">Login</h1>
            <Form>
              {isError && <p>{isErrorMessage}</p>}
              <TextField label="Email" name="email" type="text" />
              <TextField label="Password" name="password" type="text" />
              {isPending ? (
                <Button
                  className="btn-dark mt-3"
                  isLoading={!isPending}
                  type="submit"
                >
                  Sign In
                </Button>
              ) : (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </Card>
  );
};

export default Login;
