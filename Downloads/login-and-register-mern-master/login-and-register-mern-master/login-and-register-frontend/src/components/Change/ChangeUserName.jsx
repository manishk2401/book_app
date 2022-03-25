import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";

export default function ChangeUserName(props) {
  const [profile, setProfile] = useState(props.curUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const changeUsername = () => {
    const { name } = profile;
    if (name) {
      props.sendUpdateToParent(profile);
      console.log("change", profile);
    } else {
      alert("invlid input");
    }
  };
  return (
    <>
      <div style={{ padding: "10px" }}>
        <h4>Change UserName</h4>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="name"
              size="small"
              value={profile.name}
              label="Name"
              name="name"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary" style={{ margin: "16px 0px 8px 0px" }} onClick={changeUsername}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
      <Divider></Divider>
    </>
  );
}
