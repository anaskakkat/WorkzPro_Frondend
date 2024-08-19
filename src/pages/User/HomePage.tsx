import React from 'react'

import { lazy, Suspense } from "react";
import Loader from "../../components/loader/Loader";
// import Sample from "../../components/sample";

const HomePage: React.FC =() => {
  const Banner = lazy(() => import("../../components/User/Banner/Banner"));
  const Cards = lazy(() => import("../../components/User/Cards/Cards"));
  const Footer = lazy(() => import("../../components/User/Footer/Footer"));
  
  return (
    <Suspense fallback={<Loader />}>
      {/* <Sample /> */}
      <Banner />
      {/* <MidBanner /> */}

      <Cards />
      {/* <FooterCards /> */}
    </Suspense>
  );
};

export default HomePage;
