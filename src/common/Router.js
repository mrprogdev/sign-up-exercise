import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import { Signup } from "../pages/Signup";
import UserTable from "../pages/UserTable";
import { checkSesssion } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

const publicRoutes = [
  { id: 1, path: "/", exact: true, component: Signup },
  { id: 2, path: "/login", exact: true, component: Login },
];

const authRoutes = [
  { id: 1, path: "/", exact: true, component: UserTable },
  { id: 2, path: "/login", exact: true },
];

const Router = () => {
  const loggedin = useSelector((state) => state.auth.is_logged_in);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    // Will run on initial render or any dependencies inside array
    // console.log("Router - Cookies: ", Cookies.get("sessionid"));
    dispatch(checkSesssion());
  });

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading!!!</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        {!loggedin &&
          publicRoutes.map((eachRoutes) => {
            return <Route key={eachRoutes.id} {...eachRoutes} />;
          })}
        {loggedin &&
          authRoutes.map((eachRoutes) => {
            if (eachRoutes.path === "/login") {
              return (
                <Route key={eachRoutes.id} {...eachRoutes}>
                  <Redirect to="/" />
                </Route>
              );
            }
            return <Route key={eachRoutes.id} {...eachRoutes} />;
          })}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
