import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  CssBaseline,
  Divider,
  IconButton,
  List,
  Drawer,
  ListItem,
  ListItemButton,
  Avatar,
} from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Menu, MenuOpen } from "@mui/icons-material";
import { BlogRoutes, Routes, ProfileRoute } from "./Data";
import NavItem from "./Navitem";
import LeftNav from "./LeftNav";
import logo from "../../assets/images/Healthy_Hub_Logo.png";
import RightNav from "./RightNav";
import AutoLogoutModel from "../model/AutoLogoutModel";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Main = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  padding: "0 10px",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const SideNav = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout() {
  const [open, setOpen] = useState(true);
  const { authorize } = useSelector((state) => state.HelperSlice);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SideNav
          variant="permanent"
          open={open}
          sx={{
            "& .MuiDrawer-paper": {
              bgcolor: "white",
            },
          }}
        >
          <List open={open}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  transitionProperty: "justifyContent",
                  transitionDuration: "3s",
                  minHeight: 48,
                  justifyContent: open ? "space-between" : "center",
                  px: 2.5,
                }}
              >
                <Avatar
                  sx={{
                    transitionProperty: "display",
                    transitionDuration: "3s",
                    display: open ? "block" : "none",
                    minWidth: 0,
                    width: 50,
                    height: 50,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                  src={logo}
                  alt="Logo"
                />
                {open ? (
                  <IconButton
                    aria-label="close drawer"
                    onClick={handleDrawerClose}
                  >
                    <MenuOpen style={{ color: "#000000" }} />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                  >
                    <Menu style={{ color: "#000000" }} />
                  </IconButton>
                )}
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            {Routes.map((item) => (
              <NavItem item={item} key={item.text} open={open} />
            ))}
            <Divider />
            {BlogRoutes.map((item) => (
              <NavItem item={item} key={item.text} open={open} />
            ))}
            <Divider />
            {ProfileRoute.map((item) => (
              <NavItem
                item={item}
                key={item.text}
                open={open}
                listAction={item.action}
              />
            ))}
          </List>
        </SideNav>

        <Main open={open}>
          <Box
            component="header"
            sx={{
              borderRadius: "7px",
              height: "65px",
              padding: "0 1.5rem",
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <LeftNav />
            <RightNav />
          </Box>
          <Box mb={7}>
            <Outlet />
          </Box>
        </Main>
      </Box>
      {!authorize && <AutoLogoutModel />}
    </>
  );
}
