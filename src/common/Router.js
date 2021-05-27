import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import { Signup } from "../pages/Signup";
import UserTable from "../pages/UserTable";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

const publicRoutes = [
  { id: 1, path: "/", exact: true, component: Signup },
  { id: 2, path: "/login", exact: true, component: Login },
];

const authRoutes = [
  { id: 1, path: "/", exact: true, component: UserTable },
  { id: 2, path: "/login", exact: true, component: Login },
];

const Router = () => {
  const loggedin = useSelector((state) => state.auth.is_logged_in);

  return (
    <BrowserRouter>
      <Switch>
        {!loggedin &&
          publicRoutes.map((eachRoutes) => {
            if (eachRoutes.path === "/login") {
              return (
                <Route
                  key={eachRoutes.id}
                  path={eachRoutes.path}
                  exact={eachRoutes.exact}
                >
                  <Login />
                </Route>
              );
            }
            return <Route key={eachRoutes.id} {...eachRoutes} />;
          })}
        {loggedin &&
          authRoutes.map((eachRoutes) => {
            if (eachRoutes.path === "/") {
              return (
                <Route
                  key={eachRoutes.id}
                  path={eachRoutes.path}
                  exact={eachRoutes.exact}
                >
                  <Signup isLoggedIn={loggedin} />
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
