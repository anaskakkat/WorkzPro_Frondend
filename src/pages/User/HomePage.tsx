// import React from 'react'

import Banner from "../../components/User/Banner/Banner";
import Cards from "../../components/User/Cards/Cards";
import FooterCards from "../../components/User/CardsFooter/FooterCards";
import Footer from "../../components/User/Footer/Footer";
// import MidBanner from "../../components/User/MidBanner/MidBanner";
import Navbar from "../../components/User/Navbar/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Banner />
      {/* <MidBanner /> */}
      <Cards/>
      <FooterCards/>
      <Footer/>
    </>
  );
};

export default HomePage;
