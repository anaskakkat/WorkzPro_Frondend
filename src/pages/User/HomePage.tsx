// import React from 'react'

import { lazy, Suspense } from "react";
import Loader from "../../components/Loader/Loader";


const HomePage = () => {
  // Lazy load components
  const Banner = lazy(() => import("../../components/User/Banner/Banner"));
  const Cards = lazy(() => import("../../components/User/Cards/Cards"));
  // const FooterCards = lazy(
  //   () => import("../../components/User/CardsFooter/FooterCards")
  // );
  const Footer = lazy(() => import("../../components/User/Footer/Footer"));
  const Navbar = lazy(() => import("../../components/User/Navbar/Navbar"));
  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <Banner />
      {/* <MidBanner /> */}
      <Cards />
      {/* <FooterCards /> */}
      <Footer />
    </Suspense>
  );
};

export default HomePage;
