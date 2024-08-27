import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import logo from "/workzpro-high-resolution-logo.jpeg";

import UsersAdmin from "./UsersAdmin";
import toast from "react-hot-toast";
import { removeadminInfo } from "../../redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../api/admin";
import Services from "./Services";
import Workers from "../../pages/Admin/Workers";
import DashboardAdmin from "./DashboardAdmin";
import Request from "../../pages/Admin/Request";

const drawerWidth = 240;

export default function SideBarAdmin() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const dispatch = useDispatch();

  const adminInfo = useSelector((state: any) => state.adminInfo.adminInfo);
  const adminName = adminInfo ? adminInfo.name : "Admin";

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (text: string) => {
    setActiveItem(text);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutAdmin();
      if (response) {
        toast.success(response.data.message);
        dispatch(removeadminInfo());
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const renderComponent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <DashboardAdmin />;
      case "Requests":
        return <Request />;
      case "Services":
        return <Services />;
      case "Users":
        return <UsersAdmin />;
      case "Workers":
        return <Workers />;
      default:
        return <DashboardAdmin />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        style={{ background: "#003383" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="div">{adminName.toUpperCase()}</Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <div
                onClick={() => {
                  handleLogout();
                  handleClose();
                }}
              >
                Logout
              </div>
            </Menu>
          </Box>
        </Box>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <img src={logo} alt="Logo" style={{ width: "50%", height: "auto" }} />
        </Box>
        <Divider />
        <List>
          {["Dashboard", "Requests", "Services", "Users", "Workers"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => handleItemClick(text)}
                  selected={activeItem === text}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1, mt: 10 }}>
        {renderComponent()}
      </Box>
    </Box>
  );
}
