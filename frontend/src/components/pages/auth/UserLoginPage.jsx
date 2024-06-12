import { NavLink } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

const UserLoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    // console.log(actualData);
    // validation 
    if (actualData.email && actualData.password) {
      alert("Login Successful");
      document.getElementById("login-form").reset();
    } else {
      alert("Please fill all the fields");
    } 
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{ mt: 2 }}
        id="login-form"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          fullWidth
          margin="normal"
          id="email"
          name="email"
          label="Email Address"
        />
        <TextField
          required
          fullWidth
          margin="normal"
          id="password"
          name="password"
          label="Password"
          type="password"
        />
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Login
          </Button>
        </Box>
        <NavLink to="/">Forgot Password?</NavLink>
      </Box>
    </>
  );
};

export default UserLoginPage;
