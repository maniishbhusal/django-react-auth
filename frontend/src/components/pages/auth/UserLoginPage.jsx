import { NavLink, useNavigate } from "react-router-dom";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const UserLoginPage = () => {
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
      email: data.get("email"),
      password: data.get("password"),
    };

    // console.log(actualData);
    // validation
    if (actualData.email && actualData.password) {
      setError({ status: true, msg: "Login Successful", type: "success" });
      document.getElementById("login-form").reset();
      navigate("/");
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
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
        <NavLink to="/sendpasswordresetemail">Forgot Password?</NavLink>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </Box>
    </>
  );
};

export default UserLoginPage;
