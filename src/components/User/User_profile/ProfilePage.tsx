import React, { useState } from "react";
import Sidebar from "../Profile/Sidebar";
import Profile from "../Profile/Profile";
import BookingsUser from "../Profile/BookingsUser";

const ProfilePage: React.FC = () => {
  const [activePage, setActivePage] = useState("profile");

  return (
    <div className="flex h-screen">
      <Sidebar setActivePage={setActivePage} />
      <div className="flex-1">
        {activePage === "profile" && <Profile />}
        {activePage === "bookings" && <BookingsUser />}
      </div>
    </div>
  );
};

export default ProfilePage;
