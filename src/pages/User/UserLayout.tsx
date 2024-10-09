import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Navbar = lazy(() => import("@/components/User/navbar/Navbar"));
const Footer = lazy(() => import("@/components/User/homePage/Footer"));
const UserLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Suspense wrapper for Navbar and Outlet */}
      <Suspense fallback={<Loader />}>
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
      </Suspense>

      <Footer />
    </div>
  );
};

export default UserLayout;
