import React from "react";
import Navbar from "../../components/User/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/User/homePage/Footer";

const UserLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default UserLayout;
