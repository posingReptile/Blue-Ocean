import React, { useState } from "react";
import axios from "axios";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
} from "@mui/material";
import Pressable from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import "../../css/responsivenavbar.css";

function ResponsiveAppBar({ userObject, setComponent, setUserObject }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event, componentName) => {
    setAnchorElNav(null);
    setComponent(componentName);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event, componentName) => {
    setAnchorElUser(null);
    if (!componentName) return;
    if (componentName === "logsign") {
      axios.get("http://localhost:3000/logout").then((res) => {
        console.log("res.data", res.data);
        setUserObject({});
      });
    }
    setComponent(componentName);
  };

  return (
    <AppBar sx={{ mb: 3 }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ pt: 1, pb: 1 }}>
          <Pressable onClick={() => setComponent("dashboard")}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              <img src="./icons/shreddedlogowhite.png" height={50} />
            </Typography>
          </Pressable>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={(e) => handleCloseNavMenu(e, "calendar")}>
                <Typography textAlign="center">Calendar</Typography>
              </MenuItem>
              <MenuItem onClick={(e) => handleCloseNavMenu(e, "dashboard")}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <img src="./icons/shredded.png" height={50} />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "row-reverse",
              mr: 2,
            }}
          >
            <Button
              onClick={(e) => handleCloseNavMenu(e, "calendar")}
              sx={{
                my: 2,
                color: "white",
                fontSize: 18,
                display: "block",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#3c52b2",
                },
              }}
            >
              Calendar
            </Button>
            <Button
              onClick={(e) => handleCloseNavMenu(e, "dashboard")}
              sx={{
                my: 2,
                mr: 2,
                fontSize: 18,
                color: "white",
                display: "block",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#3c52b2",
                },
              }}
            >
              Dashboard
            </Button>
          </Box>
          <>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  pt: 2,
                  pb: 2,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#3c52b2",
                  },
                }}
              >
                <Avatar
                  color="primary"
                  variant="outlined"
                  sx={{ backgroundColor: "white", color: "primary.main" }}
                >
                  {userObject.username[0].toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                sx={{ mt: "55px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu()}
              >
                <MenuItem onClick={(e) => handleCloseUserMenu(e, "profile")}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={(e) => handleCloseUserMenu(e, "logsign")}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
