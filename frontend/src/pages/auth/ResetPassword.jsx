import { useState } from "react";
import { Grid, Box, TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    // Validation
    if (actualData.password && actualData.confirmPassword) {
      if (actualData.password === actualData.confirmPassword) {
        setError({
          status: true,
          msg: "Password Reset Successful. Redirecting to Login Page...",
          type: "success",
        });
        document.getElementById("password-reset-form").reset();
        // redirecting after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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
            <TextField
              required
              fullWidth
              margin="normal"
              id="confirmPassword"
              name="confirmPassword"
              label="New Confirm Password"
              type="password"
            />

            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                Reset Password
              </Button>
            </Box>
            {error.status && <Alert severity={error.type}>{error.msg}</Alert>}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
