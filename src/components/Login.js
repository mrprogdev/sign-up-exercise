import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import { Card } from "./Card";

const Login = () => {
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

  return (
    <Card>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <div>
            <h1 className="my-4 font-weight-bold .display-4">Login</h1>
            <Form>
              <TextField label="Email" name="email" type="text" />
              <TextField label="Password" name="password" type="text" />
              <button className="btn btn-dark mt-3" type="submit">
                Sign In
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </Card>
  );
};

export default Login;
