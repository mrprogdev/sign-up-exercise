import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "./Home";
import UserTable from "./UserTable";
import Login from "./Login";
import { Signup } from "./Signup";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const publicRoutes = [
  { path: "/", exact: true, component: Home },
  { path: "/login", exact: true, component: Login },
];

const authRoutes = [{ path: "/", exact: true, component: UserTable }];

const Router = () => {
  const isLogin = useSelector((state) => state.checkSession); // Returns true or false

  return (
    <BrowserRouter>
      <Switch>
        {!isLogin &&
          publicRoutes.map((eachRoutes) => {
            if (eachRoutes.path === "/login") {
              return (
                <Route path={eachRoutes.path} exact={eachRoutes.exact}>
                  <Login />
                </Route>
              );
            }
            return <Route {...eachRoutes} />;
          })}
        {isLogin && authRoutes.map((eachRoutes) => <Route {...eachRoutes} />)}

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
