import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import logo from "../../../assets/Logo workzpro.png";
import { logoutWorker } from "../../../api/worker";
import { removeWorkerInfo } from "../../../redux/slices/workerSlice";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

const NavbarWorker = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const naviate = useNavigate();
  const dispatch = useDispatch();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      const response = await logoutWorker();
      if (response) {
        toast.success(response.data.message);
        dispatch(removeWorkerInfo());
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <AppBar position="static" style={{ backgroundColor: "#fff" }}>
      <Toolbar className="flex justify-between shadow-md shadow-custom_lightBlue">
        <div className="flex items-center mx-24">
          <img src={logo} alt="My Logo" className="h-12 w-auto" />
        </div>
        <div className="flex items-center">
          <Typography
            variant="h6"
            component="div"
            color="textPrimary"
            className="mr-2"
          >
            {/* {name} */}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="primary"
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
            <MenuItem
              sx={{
                "&:hover": {
                  backgroundColor: "rgb(191, 219, 254)",
                },
              }}
              onClick={handleClose}
            >
              Profile
            </MenuItem>
            <MenuItem
              sx={{
                "&:hover": {
                  backgroundColor: "rgb(227, 5, 5)",
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarWorker;
