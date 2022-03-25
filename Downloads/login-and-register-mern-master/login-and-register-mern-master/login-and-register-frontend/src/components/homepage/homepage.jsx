import "./homepage.css";
import Sidenav from "../Sidenav/Sidenav";
import Navbar from "../Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Overview from "../Overview/Overview";
import { useState } from "react";
import Manageprofile from "../Manageprofile/Manageprofile";

export default function Homepage(props) {
  const [sideToggle, setSideToggle] = useState(false);
  // let currentUser = JSON.parse(localStorage.getItem("logedIn"));
  const toggleSideNav = () => {
    if (sideToggle === false) {
      setSideToggle(true);
    } else {
      setSideToggle(false);
    }
  };

  const updateFromManage = (e) => {
    props.userUpdateToApp(e);
  };

  return (
    <>
      <Navbar sideNav={toggleSideNav}></Navbar>
      <div className="app-container">
        <div className="app-side sidenavmenu" style={sideToggle === true ? { flex: "0 0%" } : { flex: "1 15%" }}>
          <Sidenav></Sidenav>
        </div>

        <div className="app-side wrapper">
          <div className="main-content">
            <Switch>
              <Route exact path="/home">
                <Overview />
              </Route>
              <Route exact path="/home/dashboard">
                <Overview />
              </Route>
              <Route exact path="/home/manage-profile">
                <Manageprofile curUser={props.curUser} updateToHome={updateFromManage} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}
