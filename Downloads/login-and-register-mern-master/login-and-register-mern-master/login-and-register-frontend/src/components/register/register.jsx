import React, { useState } from "react";
import "./register.css";
import "./registerstyles.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
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

  const register = () => {
    let emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const { name, email, password, confirmPass } = user;
    if (name && emailFormat.test(email) && password && password === confirmPass) {
      axios.post("http://localhost:9002/register", user).then((res) => {
        alert(res.data.message);
        history.push("/login");
      });
    } else {
      alert("Invalid input");
    }
  };

  return (
    <>
      <div className="register_container">
        <div className="register_signup_form_container">
          <div className="register_left">
            <h1>Welcome Back</h1>
            <button className="register_white_btn" onClick={() => history.push("/login")}>
              Login
            </button>
          </div>
          <div className="register_right">
            <div className="register_form_container">
              <h1>Create Account</h1>
              <TextField fullWidth id="name" size="small" label="Name" name="name" onChange={handleChange} margin="normal" variant="outlined" />

              {/* <input type="text" className='register_input' name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input> */}

              <TextField
                fullWidth
                type="email"
                size="small"
                id="email"
                value={user.email}
                label="Email"
                margin="normal"
                name="email"
                onChange={handleChange}
                variant="outlined"
              />
              {/* <input type="text" className='register_input' name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input> */}

              <TextField
                fullWidth
                type="password"
                size="small"
                id="password"
                value={user.password}
                label="Password"
                name="password"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              {/* <input type="password" className='register_input' name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input> */}

              {/* <TextField fullWidth type="password" size="small" id="confirmPass" value={user.confirmPass} label="Confirm Password" margin="normal" name="confirmPass" onChange={handleChange} variant="outlined" /> */}

              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="confirm-password" style={{ lineHeight: "0.80em" }}>
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="confirm-password"
                  size="small"
                  name="confirmPass"
                  type={user.showPassword ? "text" : "password"}
                  value={user.confirmPass}
                  onChange={handleChange}
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
                  label="Confirm Password"
                />
              </FormControl>
              {/* <input type="password" className='register_input' name="confirmPass" value={user.confirmPass} placeholder="Re-enter Password" onChange={handleChange}></input> */}
              <button className="register_green_btn" onClick={register}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
