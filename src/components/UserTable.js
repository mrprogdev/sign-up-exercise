import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    dispatch({ type: "logout" });
    history.push("/login");
  };

  useEffect(() => {
    // Will run on initial render or any dependencies inside array

    const AuthStr = "Bearer " + localStorage.getItem("token");
    axios
      .get(
        `https://5k9okv4iu0.execute-api.ap-southeast-1.amazonaws.com/production/users`,
        { headers: { Authorization: AuthStr } }
      )
      .then((response) => {
        setUserList(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, []);

  return (
    <div>
      <h2>User table</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((users) => (
            <tr key={users._id}>
              <th>{users._id}</th>
              <th>{users.name}</th>
              <th>{users.email}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};

export default UserTable;
