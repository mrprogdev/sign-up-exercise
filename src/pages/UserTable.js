import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from "../components/UI/Button";
import { userAuth } from "../components/axios";

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const history = useHistory();
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch({ type: "logout" });
    history.push("/login");
  };

  useEffect(() => {
    // Will run on initial render or any dependencies inside array
    const AuthStr = "Bearer " + token;

    userAuth
      .get("/users", values)
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
      <br />
      <Button onClick={handleLogOut}>Log out</Button>
    </div>
  );
};

export default UserTable;
