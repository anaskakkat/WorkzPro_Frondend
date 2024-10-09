import { motion } from "framer-motion";
import electricalLogo from "../../../assets/electric-appliance.png";
import gardening from "../../../assets/plant.png";
import homeAppliance from "../../../assets/home-appliance.png";
import acMechanic from "../../../assets/ac setting_.png";
import cleaningLogo from "../../../assets/cleaning.png";
import paintingLogo from "../../../assets/painting.png";
import plumbingLogo from "../../../assets/plumber.png";
import construction from "../../../assets/construction.png";
import AnimatedSection from "@/components/AnimatedSection";
import Tilt from 'react-parallax-tilt'
const Cards = () => {
  const services = [
    { title: "Electrical Services", logo: electricalLogo },
    { title: "Gardening Services", logo: gardening },
    { title: "Home Appliance Services", logo: homeAppliance },
    { title: "AC Mechanic Services", logo: acMechanic },
    { title: "Cleaning Services", logo: cleaningLogo },
    { title: "Painting Services", logo: paintingLogo },
    { title: "Plumbing Services", logo: plumbingLogo },
    { title: "Construction Services", logo: construction },
  ];

  return (
    <div className="pt-8">
      <motion.h2
        className="text-sm lg:text-2xl font-bold text-center pt-6"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        What We Can Help With
      </motion.h2>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <AnimatedSection
                key={index}
                direction="up"
                delay={index * 0.2}
                duration={0.5}
              >
                <Tilt>

                <div className="bg-white p-4 border md:p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 text-center w-full h-48">
                  <img
                    src={service.logo}
                    alt={`${service.title} logo`}
                    className="h-16 mx-auto mb-4"
                  />
                  <h3 className="text-xl font-medium">{service.title}</h3>
                </div>
                </Tilt>

              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
