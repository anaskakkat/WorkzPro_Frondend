import electricalLogo from "../../../assets/electric-appliance.png";
import gardening from "../../../assets/plant.png";
import homeAppliance from "../../../assets/home-appliance.png";
import acMechanic from "../../../assets/ac setting_.png";
import cleaningLogo from "../../../assets/cleaning.png";
import paintingLogo from "../../../assets/painting.png";
import plumbingLogo from "../../../assets/plumber.png";
import construction from "../../../assets/construction.png";

const Cards = () => {
  const services = [
    { title: "Electrical Services", logo: electricalLogo },
    { title: "Gardening Services", logo: gardening },
    { title: "Home Appliance Services", logo: homeAppliance },
    { title: "Ac Mechanic Services", logo: acMechanic },
    { title: "Cleaning Services", logo: cleaningLogo },
    { title: "Painting Services", logo: paintingLogo },
    { title: "Plumbing Services", logo: plumbingLogo },
    { title: "Construction Services", logo: construction },
  ];

  return (
    <>
      <h2 className=" sm:2xl mt-4 text-navyBlue font-bold text-center mb-8">
        What We Can Help With
      </h2>
      <div className="bg-bg_blue py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-center w-full"
              >
                <img
                  src={service.logo}
                  alt={`${service.title} logo`}
                  className="h-16 mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold">{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
