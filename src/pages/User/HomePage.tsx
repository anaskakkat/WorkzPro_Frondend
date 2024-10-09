import AnimatedSection from "@/components/AnimatedSection";
import React, { lazy, Suspense, useEffect } from "react";
const Banner = lazy(() => import("../../components/User/homePage/Banner"));
const Cards = lazy(() => import("../../components/User/homePage/Cards"));
const Card2 = lazy(() => import("../../components/User/homePage/Card2"));

const HomePage: React.FC = () => {
  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem("scrollPosition", String(window.scrollY));
    };
    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimatedSection direction="down" duration={0.8}>
        <Banner />
      </AnimatedSection>

      <div className="bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="left" delay={0.2}>
            <Cards />
          </AnimatedSection>
        </div>
      </div>

      <div className="bg-custom-gradient-black mt-4 py-5">
        <div className="container mx-auto px-4">
          {/* <AnimatedSection direction="right" duration={0.6}> */}
            <Card2 />
          {/* </AnimatedSection> */}
        </div>
      </div>
    </Suspense>
  );
};

export default HomePage;