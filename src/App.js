import "./App.css";
import { Signup } from "./components/Signup";
import PersonList from "./components/PersonList";
import Login from "./components/Login";

function App() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <Signup />
          <PersonList />
        </div>
        <br />
        <div className="col-md-7 my-auto">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default App;
