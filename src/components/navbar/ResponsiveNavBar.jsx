import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import "../../css/responsivenavbar.css";

function ResponsiveAppBar({ setComponent }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (e, componentName) => {
    setAnchorElNav(null);
    console.log(componentName);
    setComponent('calendar')
    // setComponent(componentName);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e, componentName) => {
    setAnchorElUser(null);
    console.log(componentName);
    // setComponent(componentName);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ pt: 1, pb: 1 }}>
          {/* large view typography*/}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <img src="./icons/shredded.png" height={50} />
          </Typography>

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
              <MenuItem onClick={(e) => handleCloseNavMenu(e, "calender")}>
                <Typography textAlign="center">Calender</Typography>
              </MenuItem>
              <MenuItem onClick={(e) => handleCloseNavMenu(e, "dashboard")}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Small view typography */}
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
              onClick={(e) => handleCloseNavMenu(e, "calender")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Calender
            </Button>
            <Button
              onClick={(e) => handleCloseNavMenu(e, "dashboard")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Dashboard
            </Button>
          </Box>

          {/* Profile Icon */}
          <>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ pt: 2, pb: 2 }}>
                <Avatar />
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
                <MenuItem onClick={(e) => handleCloseUserMenu(e, "logout")}>
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
