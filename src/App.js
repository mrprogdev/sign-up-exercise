import "./App.css";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Signup } from "./components/Signup";
import PersonList from "./components/PersonList";
import Login from "./components/Login";
import NotFound from "./pages/NotFound";
import Home from "./components/Home";

function App() {
  return (
    <div className="mainBody">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5">
            <Router>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </Router>
          </div>
          <br />
          <div className="col-md-7 my-auto">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
