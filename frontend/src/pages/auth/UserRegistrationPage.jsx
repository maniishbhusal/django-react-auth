import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useRegisterUserMutation } from "../../services/userAuthApi";
import { storeToken } from "../../services/localStorageService";

const UserRegistrationPage = () => {
  const [serverError, setServerError] = useState({});
  const navigate = useNavigate(); // for redirection

  // rtk query for register user
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data.get("tc"));
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
      tc: data.get("tc"),
    };
    const res = await registerUser(actualData);
    if (res.error) {
      console.log(res.error.data);
      setServerError(res.error.data);
    }
    if (res.data) {
      console.log(res.data);
      storeToken(res.data.token); // store token locally
      navigate("/login");
    }
  };
  return (
    <>
      {/* {serverError.name ? console.log("name error", serverError.name[0]) : ""}
      {serverError.email
        ? console.log("email error", serverError.email[0])
        : ""}
      {serverError.password
        ? console.log("password error", serverError.password[0])
        : ""}
      {serverError.password
        ? console.log("password2 error", serverError.password2[0])
        : ""}
      {serverError.tc ? console.log("tc error", serverError.tc[0]) : ""}
      {serverError.non_field_errors
        ? console.log("non error", serverError.non_field_errors[0])
        : ""} */}
      <Box
        component="form"
        noValidate
        sx={{ mt: 2 }}
        id="registration-form"
        onSubmit={handleSubmit}
      >
        {/* name field */}
        <TextField
          required
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="Name"
        />
        {serverError.name ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.name[0]}
          </Typography>
        ) : (
          ""
        )}

        {/* {email field} */}
        <TextField
          required
          fullWidth
          margin="normal"
          id="email"
          name="email"
          label="Email Address"
        />
        {serverError.email ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.email[0]}
          </Typography>
        ) : (
          ""
        )}

        {/* password field */}
        <TextField
          required
          fullWidth
          margin="normal"
          id="password"
          name="password"
          label="Password"
          type="password"
        />
        {serverError.password ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.password[0]}
          </Typography>
        ) : (
          ""
        )}
        {/* password2 field */}
        <TextField
          required
          fullWidth
          margin="normal"
          id="password2"
          name="password2"
          label="Confirm Password"
          type="password"
        />
        {serverError.password2 ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.password2[0]}
          </Typography>
        ) : (
          ""
        )}

        {/* tc field */}

        <FormControlLabel
          control={<Checkbox value={true} color="primary" name="tc" id="tc" />}
          label="I agree to term and condition."
        />
        {serverError.tc ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.tc[0]}
          </Typography>
        ) : (
          ""
        )}

        {/* error message */}
        {serverError.non_field_errors ? (
          <Alert severity="error">{serverError.non_field_errors[0]}</Alert>
        ) : (
          ""
        )}

        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UserRegistrationPage;
