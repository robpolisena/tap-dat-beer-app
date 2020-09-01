import React from "react";
import TextField from "@material-ui/core/TextField";
import { Box, Button } from "@material-ui/core";

export default function UserDetails(props) {
  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        id="firstName"
        label="First Name"
        type="text"
        name="firstName"
        value={props.first_name}
        fullWidth
        onChange={props.onChange}
      />
      <TextField
        margin="dense"
        id="lastName"
        label="Last Name"
        type="text"
        name="lastName"
        value={props.last_name}
        fullWidth
        onChange={props.onChange}
      />
      <TextField
        margin="dense"
        id="email"
        label="Email"
        type="email"
        name="email"
        value={props.email}
        fullWidth
        onChange={props.onChange}
      />
      <Box width={1} textAlign="right">
        {props.first_name && (
          <Button variant="contained" color="primary" onClick={props.openForm}>
            Update Info
          </Button>
        )}
      </Box>
    </div>
  );
}