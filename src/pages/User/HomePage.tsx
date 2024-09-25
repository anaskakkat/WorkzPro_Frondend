import React from "react";

import { lazy, Suspense } from "react";
import Loader from "../../components/Loader/Loader";
import Card2 from "@/components/User/homePage/Card2";
import { Container } from "@mui/material";
// import StepsCard from '@/components/User/homePage/StepsCard';

const HomePage: React.FC = () => {
  const Banner = lazy(() => import("../../components/User/homePage/Banner"));
  const Cards = lazy(() => import("../../components/User/homePage/Cards"));

  return (
    <Suspense fallback={<Loader />}>
      <Banner />

      <div className="bg-gray-50">
        <Container>
          <Cards />
        </Container>
      </div>

      <div className="bg-custom-gradient-black mt-4 py-5">
        <Container>
          <Card2 />
        </Container>
      </div>

      {/* <StepsCard/>  */}
    </Suspense>
  );
};

export default HomePage;
