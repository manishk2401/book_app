import React, { useState } from "react";
// import "./login.css"
import "./loginstyles.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login(props) {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleInput = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };

  const login = () => {
    axios.post("http://localhost:9002/login", user).then((res) => {
      alert(res.data.message);
      props.setLoginUser(res.data.user);
      localStorage.setItem("logedIn", JSON.stringify(res.data.user));
      history.push("/home");
    });
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <div className="form_container">
            <h1 style={{ marginBottom: "20px" }}>Login to Your Account</h1>

            <TextField fullWidth type="email" size="small" id="email" label="Email" name="email" onChange={handleChange} variant="outlined" />

            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                size="small"
                type={user.showPassword ? "text" : "password"}
                value={user.password}
                onChange={handleInput("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {user.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <button className="green_btn" onClick={login}>
              Login
            </button>
          </div>
        </div>
        <div className="right">
          <h1>New Here ?</h1>
          <button className="white_btn" onClick={() => history.push("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
