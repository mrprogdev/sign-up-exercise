import { useState, useEffect } from "react";
import { Signup } from "./Signup";
import UserTable from "./UserTable";
import axios from "axios";

const Home = () => {
  const [isLogIn, setIsLogIn] = useState(true);

  useEffect(() => {
    // Will run on initial render or any dependencies inside array

    const AuthStr = "Bearer x7XV8wW1v9OY3GNMQYEwb43EQRyPjbEm6kaALDnp";
    axios
      .get(
        `https://5k9okv4iu0.execute-api.ap-southeast-1.amazonaws.com/production/users`,
        { headers: { Authorization: AuthStr } }
      )
      .then((response) => {
        // If request is good...
        console.log(response);
      })
      .catch((error) => {
        console.log("error " + error);
      });

    console.log(localStorage.getItem("token"));
    localStorage.getItem("token") === null
      ? setIsLogIn(false)
      : setIsLogIn(true);
    console.log(isLogIn);
  }, []);

  return (
    <div>
      {localStorage.getItem("token") === null ? <Signup /> : <UserTable />}
    </div>
  );
};

export default Home;
