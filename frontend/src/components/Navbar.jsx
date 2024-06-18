import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getToken } from "../services/localStorageService";

const Navbar = () => {
  const { access_token } = getToken();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            ManishShop
          </Typography>
          <Button
            component={NavLink}
            to="/"
            sx={{ color: "white", textTransform: "none" }}
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "",
              backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : "",
            })}
          >
            Home
          </Button>

          <Button
            component={NavLink}
            to="/contact"
            sx={{ color: "white", textTransform: "none" }}
            style={({ isActive }) => ({
              textDecoration: isActive ? "underline" : "",
              backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : "",
            })}
          >
            Contact
          </Button>

          {access_token ? (
            <Button
              component={NavLink}
              to="/dashboard"
              sx={{ color: "white", textTransform: "none" }}
            >
              Dashboard
            </Button>
          ) : (
            <Button
              component={NavLink}
              to="/login"
              sx={{ color: "white", textTransform: "none" }}
              style={({ isActive }) => ({
                textDecoration: isActive ? "underline" : "",
                backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : "",
              })}
            >
              Login/Reg
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
