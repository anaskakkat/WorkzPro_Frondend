interface FutureCardProps {
  title: string;
  description: string;
  Icon: React.ElementType;
}
const FutureCard: React.FC<FutureCardProps> = ({
  title,
  description,
  Icon,
}) => {
  return (
    <div className="h-48  border border-gray-100 rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex w-full justify-evenly ">
        {" "}
        <Icon className="text-orange-500" fontSize="large" />
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>

      {/* Underline */}
      <hr className="w-12 border-t-2 border-blue-500 my-2" />

      {/* Description */}
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default FutureCard;
