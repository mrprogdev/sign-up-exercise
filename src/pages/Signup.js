import { Formik, Form } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import { TextField } from "../components/UI/TextField";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Card } from "../components/UI/Card";
import Button from "../components/UI/Button";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import api from "../common/axios";

export const Signup = (props) => {
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false); // for message error if login unsuccessful
  const [isErrorMessage, setIsErrorMessage] = useState(""); // for message error if login unsuccessful
  const history = useHistory();
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{7,}$/;

  useEffect(() => {
    // Will run on initial render or any dependencies inside array
    console.log(Cookies.get("token"));
  }, []);

  const HandleLogOut = () => {
    Cookies.remove("token");
    history.push("/login");
  };

  const validate = Yup.object({
    name: Yup.string()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .max(30, " Must be less than 30 characters or less")
      .matches(regex, "Must have atleast one letter and atleast one number")
      .required("password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "password must match")
      .required("Confirm password is required"),
  });

  if (props.isLoggedIn) {
    return (
      <div>
        <h1>Hellow World</h1>
        <Button className="btn-dark mt-3" onClick={HandleLogOut}>
          Log Out
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <Formik
        initialValues={{
          name: "Person A",
          email: "bb@cc.com",
          password: "abcd3fgh",
          confirmPassword: "abcd3fgh",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
          setIsPending(false);
          setIsError(false);
          api
            .post("/register", values)
            .then((response) => {
              setIsPending(true);
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
            <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
            {isError && <p className="text-danger">{isErrorMessage}</p>}
            <Form>
              <TextField label="Name" name="name" type="text" />
              <TextField label="Email" name="email" type="text" />
              <TextField label="Password" name="password" type="text" />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="text"
              />

              <Button
                className="btn-dark mt-3"
                isLoading={!isPending}
                type="submit"
              >
                Register
              </Button>

              {isPending && (
                <Button className="btn-danger mt-3 ml-3" type="reset">
                  Reset
                </Button>
              )}
            </Form>
          </div>
        )}
      </Formik>
      <br />
      <Link to="/login">Already have Account? Click here</Link>
    </Card>
  );
};
