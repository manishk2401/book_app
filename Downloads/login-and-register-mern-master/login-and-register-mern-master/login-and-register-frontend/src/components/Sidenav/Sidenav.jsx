import React from "react";
import style from "./sidenav.module.css";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";

export default function Sidenav() {
  return (
    <div className={style.sidenav}>
      <NavLink to="/home/dashboard" activeClassName={style.active_link} className={style.navLink}>
        Dashboard
      </NavLink>
      <Divider style={{ margin: "5px" }} />
      <NavLink to="/home/manage-profile" activeClassName={style.active_link} className={style.navLink}>
        Manage Profile
      </NavLink>
      <Divider style={{ margin: "5px" }} />
    </div>
  );
}
