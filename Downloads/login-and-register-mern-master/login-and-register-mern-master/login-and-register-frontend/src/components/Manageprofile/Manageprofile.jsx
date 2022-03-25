import React from "react";
import "./manageprofile.css";
import ChangePassword from "../Change/ChangePassword";
import ChangeUserName from "../Change/ChangeUserName";

export default function Manageprofile(props) {
  const updateFromChange = (e) => {
    props.updateToHome(e);
  };
  return (
    <div className="addFormContainer">
      <h2 style={{ margin: "5px 0px" }}>Manage Profile</h2>
      <ChangeUserName curUser={props.curUser} sendUpdateToParent={updateFromChange} />
      <ChangePassword curUser={props.curUser} sendUpdateToParent={updateFromChange} />
    </div>
  );
}
