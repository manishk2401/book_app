import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

export default function ChangePassword(props) {
  const [profile, setProfile] = useState(props.curUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const changePassword = () => {
    const { password, confirmPass } = profile;
    if (password && password === confirmPass) {
      props.sendUpdateToParent(profile);
      axios
        .post("http://localhost:9002/updatepass", profile)
        .then(function (response) {
          console.log(response);
          // alert(response.data.message);
        })
        .catch(function (error) {
          // alert(error.data.message);
          console.log(error);
        });
    } else {
      alert("invlid input");
    }
  };

  const handleClickShowPassword = () => {
    setProfile({
      ...profile,
      showPassword: !profile.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div style={{ padding: "10px" }}>
        <h4>Change Password</h4>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="password"
              size="small"
              label="New Password"
              name="password"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }} style={{ marginTop: "15px" }} variant="outlined">
              <InputLabel htmlFor="confirm-password" style={{ lineHeight: "0.80em" }}>
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirm-password"
                size="small"
                name="confirmPass"
                type={profile.showPassword ? "text" : "password"}
                value={profile.confirmPass}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {profile.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary" style={{ margin: "16px 0px 8px 0px" }} onClick={changePassword}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
