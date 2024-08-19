import React from "react";
import Navbar from "../../components/User/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/User/Footer/Footer";

const UserLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default UserLayout;
