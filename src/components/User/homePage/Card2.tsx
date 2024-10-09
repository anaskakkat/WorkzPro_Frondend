import FutureCard from "./card/FutureCard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MessageIcon from "@mui/icons-material/Message";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const cardData = [
  {
    title: "Saves you time",
    description:
      "Let us take care of your problems efficiently and effectively, giving you valuable time to focus on what matters most.",
    Icon: AccessTimeIcon,
  },
  {
    title: "Seamless Communication",
    description:
      "We believe in clear and open lines of communication. We listen to your specific service requirements, ensuring that we understand and meet your expectations.",
    Icon: MessageIcon,
  },
  {
    title: "Cash Free Payment",
    description:
      "Say goodbye to the hassle of cash payments options for a smooth and hassle-free transaction experience.",
    Icon: CreditCardIcon,
  },
];

const Card2 = () => {
  return (
    <div className="flex flex-col items-center space-y-6 my-14">
      {/* Heading */}
      <motion.h4
        className="text-center text-2xl font-bold text-gray-200"
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1}}
      >
        What makes us <span className="text-blue-500">unique</span>?
      </motion.h4>

      {/* Cards container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {cardData.map((card, index) => (
          <AnimatedSection key={index} direction="down" delay={index * 0.2}>
            <FutureCard title={card.title} description={card.description} Icon={card.Icon} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Card2;
