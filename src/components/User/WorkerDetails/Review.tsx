import { formatDateForChat } from "@/utils/chatHelperFunctions";
import { Rating } from "@mui/material";
import userLogo from '/user.png';

interface ReviewProps {
  userName: string;
  userAvatar: string;
  reviewDate: string;
  rating: number;
  comment: string;
}

const Review = ({
  userName,
  userAvatar,
  reviewDate,
  rating,
  comment,
}: ReviewProps) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-lg mx-auto bg-white mb-6 w-auto max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center">
          {/* User profile image or avatar */}
          <img
            src={userAvatar || userLogo}
            alt={userName}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800">
              {userName}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Reviewed on {formatDateForChat(reviewDate)}
            </p>
          </div>
        </div>
        {/* Star Rating */}
        <div className="flex items-center">
          <Rating value={rating} readOnly />
          <span className="ml-2 text-xs sm:text-sm md:text-base text-gray-600">({rating})</span>
        </div>
      </div>

      {/* Review Comment */}
      <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-700 break-words capitalize">
        {comment}
      </p>
    </div>
  );
};

export default Review;
