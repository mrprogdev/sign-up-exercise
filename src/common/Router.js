import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import { Signup } from "../pages/Signup";
import Cookies from "js-cookie";

const publicRoutes = [
  { id: 1, path: "/", exact: true, component: Signup },
  { id: 2, path: "/login", exact: true, component: Login },
];

const authRoutes = [
  { id: 1, path: "/", exact: true, component: Signup },
  { id: 2, path: "/login", exact: true, component: Login },
];

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get("token") === "xyz") setIsLoggedIn(true);
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {!isLoggedIn &&
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
        {isLoggedIn &&
          authRoutes.map((eachRoutes) => {
            if (eachRoutes.path === "/") {
              return (
                <Route
                  key={eachRoutes.id}
                  path={eachRoutes.path}
                  exact={eachRoutes.exact}
                >
                  <Signup isLoggedIn={isLoggedIn} />
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
