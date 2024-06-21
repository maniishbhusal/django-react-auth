import React, { useRef, useState } from "react";
import { Grid, Box, TextField, Typography, Button, Alert } from "@mui/material";
import {changePassword} from "../../services/userAuthApi";

const ChangePassword = () => {
  // State to manage server errors
  const [serverError, setServerError] = useState({});
  
  // Reference to the form element
  const formRef = useRef(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    // Create an object with the form data
    const actualData = {
      password: data.get("newPassword"),
      confirm_password: data.get("confirmNewPassword"),
    };

    try {
      // Call the changePassword service
      const res = await changePassword(actualData);

      // Check for errors in the response
      if (res.errors) {
        setServerError(res.errors);
        console.log("error", serverError);
      } else {
        console.log("Password changed successfully");
        setServerError(res);
        formRef.current.reset(); // Clear the form
      }
    } catch (error) {
      console.error("Error changing password", error);
    }
  };

  return (
    <Grid container justifyContent={"center"}>
      <Grid item sm={6} xs={12}>
        <h1>Change Password</h1>
        <Box
          component="form"
          noValidate
          sx={{ mt: 2 }}
          id="change-password-form"
          onSubmit={handleSubmit}
          ref={formRef} // Attach the ref to the form
        >
          <TextField
            required
            fullWidth
            margin="normal"
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
          />
          {serverError.password && (
            <Typography
              style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
            >
              {serverError.password[0]}
            </Typography>
          )}
          <TextField
            required
            fullWidth
            margin="normal"
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
          />
          {serverError.confirm_password && (
            <Typography
              style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
            >
              {serverError.confirm_password[0]}
            </Typography>
          )}
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
            >
              Change Password
            </Button>
          </Box>
          {serverError.msg && (
            <Alert severity={"success"}>{serverError.msg}</Alert>
          )}
          {serverError.non_field_errors && (
            <Alert severity="error">{serverError.non_field_errors[0]}</Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
