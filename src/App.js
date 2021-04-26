import "./App.css";
import logo from "./logo.svg";
import Router from "./components/Router";

function App() {
  return (
    <div className="mainBody">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5">
            <Router />
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
