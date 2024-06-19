import { NavLink, useNavigate } from "react-router-dom";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import { getToken, storeToken } from "../../services/localStorageService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../features/authSlice";

const UserLoginPage = () => {
  const [serverError, setServerError] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const res = await axiosInstance.post("login/", actualData);
      console.log("axios ", res);
      if (res.data) {
        console.log(res.data);
        storeToken(
          res.data.token // Store the token in local storage
        );
        let { access_token } = getToken();
        dispatch(setUserToken({ access_token: access_token }));
        navigate("/dashboard"); // Navigate to the dashboard after successful login
      }
    } catch (error) {
      console.log(error.response.data);
      setServerError(error.response.data);
    }
  };

  // let { access_token } = getToken();
  // useEffect(() => {
  //   dispatch(setUserToken({ access_token: access_token }));
  // }, [access_token, dispatch]);  

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
        {/* This will return undefined if serverError.errors is undefined or if serverError.errors.email is undefined. */}
        {serverError.errors?.email ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.errors.email[0]}
          </Typography>
        ) : (
          ""
        )}

        <TextField
          required
          fullWidth
          margin="normal"
          id="password"
          name="password"
          label="Password"
          type="password"
        />

        {serverError.errors?.password ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.errors.password[0]}
          </Typography>
        ) : (
          ""
        )}

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
      </Box>

      {/* error message */}
      {serverError.error ? (
        <Alert severity="error">{serverError.error}</Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default UserLoginPage;
