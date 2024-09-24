import FutureCard from "./card/FutureCard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MessageIcon from "@mui/icons-material/Message";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const Card2 = () => {
  return (
    <div className="flex flex-col items-center space-y-6 my-14">
      {/* Heading */}
      <h4 className="text-center text-2xl font-bold text-gray-200">
        What makes us <span className="text-blue-500">unique</span>?
      </h4>

      {/* Cards container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
      <FutureCard
          title="Saves you time"
          description="Let us take care of your problems efficiently and effectively, giving you valuable time to focus on what matters most."
          Icon={AccessTimeIcon}
        />
        <FutureCard
          title="Seamless Communication"
          description="We believe in clear and open lines of communication. We listen to your specific service requirements, ensuring that we understand and meet your expectations."
          Icon={MessageIcon}
        />
        <FutureCard
          title="Cash Free Payment"
          description="Say goodbye to the hassle of cash payments options for a smooth and hassle-free transaction experience."
          Icon={CreditCardIcon}
        />
      </div>
    </div>
  );
};

export default Card2;
