import { NavLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";

const UserRegistrationPage = () => {
  const navigate = useNavigate(); // for redirection

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data.get("tc"));
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
      tc: data.get("tc"),
    };

    // console.log(actualData);
    // validation
    if (
      actualData.name &&
      actualData.email &&
      actualData.password &&
      actualData.password_confirmation &&
      actualData.tc
    ) {
      if (actualData.password === actualData.password_confirmation) {
        setError({
          status: true,
          msg: "Registration Successful",
          type: "success",
        });
        document.getElementById("registration-form").reset();
        navigate("/");
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
      <Box
        component="form"
        noValidate
        sx={{ mt: 2 }}
        id="registration-form"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="Name"
        />

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

        <TextField
          required
          fullWidth
          margin="normal"
          id="password_confirmation"
          name="password_confirmation"
          label="Confirm Password"
          type="password"
        />

        <FormControlLabel
          control={<Checkbox value="agree" color="primary" name="tc" id="tc" />}
          label="I agree to term and condition."
        />

        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Register
          </Button>
        </Box>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </Box>
    </>
  );
};

export default UserRegistrationPage;
