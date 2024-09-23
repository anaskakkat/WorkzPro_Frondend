import React from "react";

import { lazy, Suspense } from "react";
import Loader from "../../components/loader/Loader";
import Card2 from "@/components/User/homePage/Card2";
import { Container } from "@mui/material";
// import StepsCard from '@/components/User/homePage/StepsCard';

const HomePage: React.FC = () => {
  const Banner = lazy(() => import("../../components/User/homePage/Banner"));
  const Cards = lazy(() => import("../../components/User/homePage/Cards"));

  return (
    <Suspense fallback={<Loader />}>
      <Banner />

      <Container >
        <Cards />
        <Card2 />
      </Container>

      {/* <StepsCard/>  */}
    </Suspense>
  );
};

export default HomePage;
