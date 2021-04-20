import { Formik, Form } from "formik";
import React from "react";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { Card } from "./Card";

export const Signup = () => {
  //regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

  const validate = Yup.object({
    name: Yup.string()
      .min(3, "Must be 3 characters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .max(30, " Must be less than 30 characters or less")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "password must match")
      .required("Confirm password is required"),
  });

  return (
    <Card>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <div>
            <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
            <Form>
              <TextField label="Name" name="name" type="text" />
              <TextField label="Email" name="email" type="text" />
              <TextField label="Password" name="password" type="text" />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="text"
              />
              <button className="btn btn-dark mt-3" type="submit">
                Register
              </button>
              <button className="btn btn-danger mt-3 ml-3" type="reset">
                Reset
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </Card>
  );
};
