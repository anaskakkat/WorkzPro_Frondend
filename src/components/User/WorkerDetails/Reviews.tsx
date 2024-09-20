import { useEffect, useState } from "react";
import Review from "./Review";
import { fetchReviews } from "@/api/user";

interface ReviewsProps {
  workerId: string;
}

const Reviews = ({ workerId }: ReviewsProps) => {
  const [reviews, setReviews] = useState<any[]>([]);
  
  const handleFetchReviews = async () => {
    try {
      const response = await fetchReviews(workerId);
      console.log("response--", response.reviews);
      setReviews(response.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  
  useEffect(() => {
    handleFetchReviews();
  }, [workerId]);

  return (
    <div className="w-full md:w-[900px] h-[calc(100vh-9rem)] mx-auto">
      {/* Display message if no reviews are available */}
      {reviews.length === 0 ? (
        <div className="text-center text-gray-500">No reviews available.</div>
      ) : (
        reviews.map((review, index) => (
          <Review
            key={index}
            userName={review.user.userName}
            userAvatar={review.user.profilePicture}
            reviewDate={review.updatedAt}
            rating={review.rating}
            comment={review.comment}
          />
        ))
      )}
    </div>
  );
};

export default Reviews;
