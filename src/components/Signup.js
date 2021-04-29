import { Formik, Form } from "formik";
import React from "react";
import { useState } from "react";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { Card } from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "./UI/Button";

export const Signup = () => {
  //regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  const [isPending, setIsPending] = useState(true);

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
          name: "Person A",
          email: "bb@cc.com",
          password: "abcd3fgh",
          confirmPassword: "abcd3fgh",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
          setIsPending(false);
          setTimeout(() => {
            axios({
              method: "post",
              url: `https://5k9okv4iu0.execute-api.ap-southeast-1.amazonaws.com/production/register`,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              data: {
                name: "Person C",
                email: "bbc@cc.com",
                password: "abcd3fgh",
              },
            }).then((response) => {
              setIsPending(true);
            });
          }, 100);
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
              <Button isLoading={!isPending} type="submit">
                Register
              </Button>

              {isPending && (
                <button className="btn btn-danger mt-3 ml-3" type="reset">
                  Reset
                </button>
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
