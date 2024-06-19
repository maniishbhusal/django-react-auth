import { Button, Box, CssBaseline, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./auth/ChangePassword";
import { getToken, removeToken } from "../services/localStorageService";
import { useDispatch } from "react-redux";
import { removeUserToken } from "../features/authSlice";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * The function `fetchUserDetails` makes an asynchronous request to fetch user profile details using an
   * access token and updates the user details state, handling errors if any.
   */
  const fetchUserDetails = async () => {
    try {
      const { access_token } = getToken();
      const res = await axiosInstance.get("userprofile/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(res.data);
      setUserDetails(res.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.errors);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [navigate, dispatch]);

  const handleLogout = () => {
    dispatch(removeUserToken({ access_token: null }));
    removeToken(); // remove token on user logout
    navigate("/login");
  };
  return (
    <>
      <CssBaseline />
      <Box>
        {error && (
          <Typography color="error">
            {error.detail || "An error occurred while fetching user details."}
          </Typography>
        )}
      </Box>
      <Grid container>
        <Grid
          item
          sm={4}
          sx={{ backgroundColor: "gray", p: 5, color: "white" }}
        >
          {userDetails ? (
            <Box>
              <h1>Dashboard</h1>
              <Typography variant="h5">Email: {userDetails.email}</Typography>
              <Typography variant="h6">Name: {userDetails.name}</Typography>
            </Box>
          ) : (
            <Typography>Loading...</Typography>
          )}
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={handleLogout}
            sx={{ mt: 8 }}
          >
            Logout
          </Button>
        </Grid>

        <Grid item sm={8}>
          <ChangePassword />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
