import { Rating } from "@mui/material";

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
    <div className="border border-gray-300 rounded-lg p-4 shadow-lg max-w-full md:max-w-2xl lg:max-w-4xl mx-auto bg-white mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          {/* User profile image or avatar */}
          <img
            src={userAvatar}
            alt={`${userName} Avatar`}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{userName}</h2>
            <p className="text-sm text-gray-600">Reviewed on {reviewDate}</p>
          </div>
        </div>
        {/* Star Rating */}
        <div className="flex items-center">
          <Rating value={rating} readOnly />
          <span className="ml-2 text-sm text-gray-600">({rating})</span>
        </div>
      </div>

      {/* Review Comment */}
      <p className="mt-4 text-gray-700 text-sm md:text-base">{comment}</p>
    </div>
  );
};

export default Review;
