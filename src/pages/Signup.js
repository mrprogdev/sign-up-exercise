import { Formik, Form } from "formik";
import React from "react";
import { useState } from "react";
import { TextField } from "../components/UI/TextField";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Card } from "../components/UI/Card";
import Button from "../components/UI/Button";
import { PrimaryButton } from "../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/action";

export const Signup = () => {
  const dispatch = useDispatch();
  const errMessage = useSelector((state) => state.auth.error);
  const loadingButton = useSelector((state) => state.auth.buttonLoading);
  const [isSuccessMessage, setIsSuccessMessage] = useState("");
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{7,}$/;

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
          // console.log(values);
          dispatch(userRegister(values)).then((response) => {
            if (response) {
              setIsSuccessMessage("Account Successfully created.");
            }
          });
        }}
      >
        {(formik) => (
          <div>
            <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
            <p className="text-danger">{errMessage}</p>
            {isSuccessMessage && <p>{isSuccessMessage}</p>}

            <Form>
              <TextField label="Name" name="name" type="text" />
              <TextField label="Email" name="email" type="text" />
              <TextField label="Password" name="password" type="text" />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="text"
              />

              <PrimaryButton
                className="btn-dark mt-3"
                isLoading={loadingButton}
                type="submit"
              >
                Register
              </PrimaryButton>

              {!loadingButton && (
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
