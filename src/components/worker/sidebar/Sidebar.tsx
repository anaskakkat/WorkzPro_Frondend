import React, { useState } from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import {
  Dashboard,
  Book,
  Chat,
  Payment,
  Schedule,
  RateReview,
} from "@mui/icons-material";
import clsx from "clsx"
const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: 'Booking', icon: <Book /> },
    { text: 'Chat', icon: <Chat /> },
    { text: 'Payments', icon: <Payment /> },
    { text: 'Slots', icon: <Schedule /> },
    { text: 'Reviews', icon: <RateReview /> },
  ];

  return (
    <div className="w-64 bg-custom_bg_blue text-custom_navyBlue min-h-screen p-4">
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => setActiveItem(item.text)}
            className={clsx("rounded-md hover:bg-custom_lightBlue transition-colors ", {
              "bg-custom_buttonColor text-white": activeItem === item.text,
            })}
          >
            <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
