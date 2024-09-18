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
      console.log("response--", response);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    handleFetchReviews();
  }, [workerId]);
  return (
    <div className="w-full md:w-[900px] h-[calc(100vh-9rem)] mx-auto">
      {reviews.map((review, index) => (
        <Review
          key={index}
          userName={review.userName}
          userAvatar={review.userAvatar}
          reviewDate={review.reviewDate}
          rating={review.rating}
          comment={review.comment}
        />
      ))}
    </div>
  );
};

export default Reviews;
