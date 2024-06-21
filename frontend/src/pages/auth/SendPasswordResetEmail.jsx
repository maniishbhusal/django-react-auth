import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useState } from "react";
import { sendResetPasswordEmail } from "../../services/userAuthApi";

const SendPasswordResetEmail = () => {
  // State to manage server response
  const [serverRes, setServerRes] = useState({});

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    // Create an object with the form data
    const emailData = {
      email: data.get("email"),
    };

    try {
      // Call the sendResetPasswordEmail service
      const res = await sendResetPasswordEmail(emailData);

      // Check for errors in the response
      if (res.errors) {
        setServerRes(res.errors);
      } else {
        setServerRes(res);
        // document.getElementById("password-reset-email-form").reset();
      }
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  return (
    <Grid container justifyContent={"center"}>
      <Grid item sm={6} xs={12}>
        <Box
          component="form"
          noValidate
          sx={{ mt: 2 }}
          id="password-reset-email-form"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email Address"
            type="email"
          />
          
          {serverRes.email && (
            <Typography
              style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
            >
              {serverRes.email[0]}
            </Typography>
          )}

          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
            >
              Reset Password
            </Button>
          </Box>
          
          {serverRes.msg && (
            <Alert severity={"success"}>{serverRes.msg}</Alert>
          )}

          {serverRes.non_field_errors && (
            <Alert severity="error">{serverRes.non_field_errors[0]}</Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SendPasswordResetEmail;
