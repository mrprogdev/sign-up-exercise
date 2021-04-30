import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";
import UserTable from "../pages/UserTable";
import Login from "../pages/Login";
import { Signup } from "../pages/Signup";
import Cookies from "js-cookie";

const publicRoutes = [
  { path: "/", exact: true, component: Signup },
  { path: "/login", exact: true, component: Login },
];

const authRoutes = [
  { path: "/", exact: true, component: Signup },
  { path: "/login", exact: true, component: Login },
];

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get("token") === "xyz") setIsLoggedIn(true);
  });

  return (
    <BrowserRouter>
      <Switch>
        {!isLoggedIn &&
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
        {isLoggedIn &&
          authRoutes.map((eachRoutes) => {
            if (eachRoutes.path === "/") {
              return (
                <Route path={eachRoutes.path} exact={eachRoutes.exact}>
                  <Signup isLoggedIn={isLoggedIn} />
                </Route>
              );
            }

            return <Route {...eachRoutes} />;
          })}

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
