import React, { useState } from "react";
import style from "./addmodal.module.css";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";

export default function AddModal(props) {
  const handleClose = () => {
    props.closeModal();
  };

  const open = Boolean(props.openModal);
  const id = open ? "simple-popover" : undefined;

  const [location, setLocation] = useState({
    name: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    active: false,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: value,
    });
  };

  const handleCheck = (e) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: e.target.checked,
    });
  };

  const handleInput = (prop) => (event) => {
    setLocation({ ...location, [prop]: event.target.value });
  };

  const addLocation = () => {
    const { name, city, district, state, pincode } = location;
    if (name && city && district && state && pincode) {
      props.addServiceLocation(location);
    } else {
      alert("invlid input");
    }
  };

  return (
    <>
      <Popover
        id={id}
        width="200px"
        open={open}
        anchorEl={props.openModal}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={style.addFormContainer}>
          <h4 style={{ margin: "5px 0px" }}>Add Service Location</h4>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField fullWidth id="name" size="small" label="Name" name="name" onChange={handleChange} margin="normal" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                size="small"
                id="city"
                value={location.city}
                label="City"
                margin="normal"
                name="city"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                size="small"
                id="district"
                value={location.district}
                label="District"
                name="district"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                size="small"
                id="state"
                value={location.state}
                label="State"
                name="state"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                size="small"
                id="pincode"
                value={location.pincode}
                label="Pincode"
                name="pincode"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel onChange={handleCheck} id="active" name="active" control={<Checkbox />} label="Active" labelPlacement="start" />
            </Grid>

            <Grid item xs={6}>
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="secondary" onClick={addLocation}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Popover>
    </>
  );
}
