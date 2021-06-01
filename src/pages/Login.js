import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TextField } from "../components/UI/TextField";
import { Card } from "../components/UI/Card";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/action";

const Login = () => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{7,}$/;
  const dispatch = useDispatch();
  const errMessage = useSelector((state) => state.auth.error);
  const loadingButton = useSelector((state) => state.auth.buttonLoading);
  const history = useHistory();

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
          dispatch(userLogin(values)).then((response) => {
            if (response) {
              history.push("/");
            }
          });
        }}
      >
        {(formik) => (
          <div>
            <h1 className="my-4 font-weight-bold .display-4">Login</h1>
            <Form>
              <TextField label="Email" name="email" type="text" />
              <TextField label="Password" name="password" type="text" />
              {errMessage && <p className="text-danger">{errMessage}</p>}
              {/* {isError && <p className="text-danger">{errMessage}</p>} */}
              <PrimaryButton
                className="btn-dark mt-3"
                isLoading={loadingButton}
                type="submit"
              >
                Sign In
              </PrimaryButton>
            </Form>
          </div>
        )}
      </Formik>
      <br />
      <Link to="/">Don't have an Account? Sign up here</Link>
    </Card>
  );
};

export default Login;
