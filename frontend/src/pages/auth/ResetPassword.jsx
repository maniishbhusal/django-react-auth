import { useState } from "react";
import { Grid, Box, TextField, Button, Alert, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/userAuthApi";

const ResetPassword = () => {
  // State to manage server response
  const [serverRes, setServerRes] = useState({});
  const navigate = useNavigate();
  const { uid, token } = useParams();

  // Log the uid and token for debugging
  console.log("uid,", uid);
  console.log("token,", token);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // Create an object with the form data
    const actualData = {
      password: data.get("password"),
      confirm_password: data.get("confirmPassword"),
    };

    try {
      // Call the resetPassword service
      const res = await resetPassword(actualData, uid, token);

      // Check for errors in the response
      if (res.errors) {
        setServerRes(res.errors);
      } else {
        setServerRes(res);
        console.log("Password reset successfully");
        navigate("/login"); // Redirect to login page on success
      }
    } catch (error) {
      console.error("Error resetting password", error);
    }
  };

  return (
    <Grid container justifyContent={"center"}>
      <Grid item sm={6} xs={12}>
        <h1>Reset Password</h1>
        <Box
          component="form"
          noValidate
          sx={{ mt: 2 }}
          id="password-reset-form"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="New Password"
            type="password"
          />
          
          {serverRes.password && (
            <Typography
              style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
            >
              {serverRes.password[0]}
            </Typography>
          )}

          <TextField
            required
            fullWidth
            margin="normal"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
          />

          {serverRes.confirm_password && (
            <Typography
              style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
            >
              {serverRes.confirm_password[0]}
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

export default ResetPassword;
