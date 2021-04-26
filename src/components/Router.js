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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const isLogin = useSelector((state) => state.checkSession); // Redux

  useEffect(() => {
    // Will run on initial render or any dependencies inside array
    console.log(isLoggedIn);
    console.log(localStorage.getItem("token"));
    console.log();
    //if (localStorage.getItem("token") !== null) setIsLoggedIn(true);
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
                  <Login setIsLoggedIn={setIsLoggedIn} />
                </Route>
              );
            }
            return <Route {...eachRoutes} />;
          })}
        {isLoggedIn &&
          authRoutes.map((eachRoutes) => <Route {...eachRoutes} />)}

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
