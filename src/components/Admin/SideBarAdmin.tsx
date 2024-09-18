import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestIcon from "@mui/icons-material/RequestPage";
import ServicesIcon from "@mui/icons-material/Construction";
import UsersIcon from "@mui/icons-material/People";
import WorkersIcon from "@mui/icons-material/Work";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
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
import { Logout } from "@mui/icons-material";

const drawerWidth = 240;

export default function SideBarAdmin() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const dispatch = useDispatch();

  const adminInfo = useSelector((state: any) => state.adminInfo.adminInfo);
  const adminName = adminInfo ? adminInfo.name : "Admin";

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
    <div className="flex bg-gray-50">
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#f9fafb",
          color: "#000000",
          boxShadow: "none",
          borderBottom: "#f9fafb",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 1.5 }}>
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
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
        <div>
          <img src={logo} alt="Logo" className="w-40 py-1 mx-auto" />
        </div>
        <Divider />
        <div className="bg-custom-gradient-black h-full m-2 rounded-xl p-2">
          {[
            { text: "Dashboard", icon: <DashboardIcon /> },
            { text: "Requests", icon: <RequestIcon /> },
            { text: "Services", icon: <ServicesIcon /> },
            { text: "Users", icon: <UsersIcon /> },
            { text: "Workers", icon: <WorkersIcon /> },
          ].map(({ text, icon }) => (
            <div
              key={text}
              className={`mx-2.5 my-2 p text-white rounded-lg ${
                activeItem === text
                  ? "bg-custom-gradient-blue"
                  : "bg-custom-gradient-black"
              }`}
            >
              <ListItemButton
                onClick={() => handleItemClick(text)}
                selected={activeItem === text}
              >
                <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </div>
          ))}
          <div
            className="bg-custom-gradient-red px-5 py-3 mx-2 flex text-white rounded-lg gap-6 cursor-pointer"
            onClick={() => handleLogout()}
          >
            <Logout /> Logout
          </div>
        </div>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1, mt: 10 }}>
        {renderComponent()}
      </Box>
    </div>
  );
}
