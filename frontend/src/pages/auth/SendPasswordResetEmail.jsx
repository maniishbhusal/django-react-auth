import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";

const SendPasswordResetEmail = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
    };

    // console.log(actualData);
    // validation
    if (actualData.email) {
      setError({
        status: true,
        msg: "Password Reset Email Sent. Please Check your Email!!",
        type: "success",
      });
      document.getElementById("password-reset-email-form").reset();
    } else {
      setError({
        status: true,
        msg: "Please Provide Valid Email",
        type: "error",
      });
    }
  };

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item sm={6} xs={12}>
          <Box
            component="form"
            noValidate
            sx={{ mt: 2 }}
            id="password-reset-email-formm"
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

            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                Reset Password
              </Button>
            </Box>
            {error.status ? (
              <Alert severity={error.type}>{error.msg}</Alert>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SendPasswordResetEmail;
