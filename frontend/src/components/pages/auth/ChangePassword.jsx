import React, { useState } from 'react';
import { Grid, Box, TextField, Button, Alert } from '@mui/material';

const ChangePassword = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      newPassword: data.get("newPassword"),
      confirmNewPassword: data.get("confirmNewPassword"),
    };

    // Validation
    if (actualData.newPassword && actualData.confirmNewPassword) {
      if (actualData.newPassword === actualData.confirmNewPassword) {
        setError({
          status: true,
          msg: "Password Changed Successfully",
          type: "success",
        });
        document.getElementById("change-password-form").reset();
      } else {
        setError({
          status: true,
          msg: "Passwords do not match",
          type: "error",
        });
      }
    } else {
      setError({
        status: true,
        msg: "All fields are required",
        type: "error",
      });
    }
  };

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item sm={6} xs={12}>
        <h1>Change Password</h1>
          <Box
            component="form"
            noValidate
            sx={{ mt: 2 }}
            id="change-password-form"
            onSubmit={handleSubmit}
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
            <TextField
              required
              fullWidth
              margin="normal"
              id="confirmNewPassword"
              name="confirmNewPassword"
              label="Confirm New Password"
              type="password"
            />

            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                Change Password
              </Button>
            </Box>
            {error.status && (
              <Alert severity={error.type}>{error.msg}</Alert>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ChangePassword;
