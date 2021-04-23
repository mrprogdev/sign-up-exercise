import React from "react";
import { useHistory } from "react-router";

const UserTable = () => {
  const history = useHistory();

  const handleLogOut = () => {
    localStorage.setItem("token", null);
    history.push({
      pathname: "/login",
      //state: { detail: response.data },
    });
    console.log("bye bye");
  };

  return (
    <div>
      userTable
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};

export default UserTable;
