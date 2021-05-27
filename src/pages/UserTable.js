import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PrimaryButton } from "../components/UI/Button";
import api from "../common/axios";
import { userSignOut } from "../redux/action";
import Cookies from "js-cookie";

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const history = useHistory();
  const token = useSelector((state) => state.auth.access_token);
  const dispatch = useDispatch();
  console.log("Your Token: ", token);

  const handleLogOut = () => {
    Cookies.remove("sessionid");
    dispatch(userSignOut());
  };

  useEffect(() => {
    // Will run on initial render or any dependencies inside array

    const AuthStr = "Bearer " + token;
    api
      .get(`/users`, { headers: { Authorization: AuthStr } })
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
      <PrimaryButton onClick={handleLogOut}>Log out</PrimaryButton>
    </div>
  );
};

export default UserTable;
