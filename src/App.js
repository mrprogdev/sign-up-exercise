import "./App.scss";
import Router from "./common/Router";

function App() {
  return (
    <div className="mainBody">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5">
            <Router />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
