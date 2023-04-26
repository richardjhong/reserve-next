import { Review } from "@prisma/client";
import ReviewCard from "./ReviewCard";

interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({reviews}: ReviewsProps) => {
  const reviewsText = () => {
    switch (reviews.length) {
      case 0:
        return "No reviews yet";
      case 1:
        return "What 1 person is saying";
      default: 
        return `What ${reviews.length} people are saying`;
    };
  };

  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b border-gray-500 pb-5">
        {reviewsText()}
      </h1>
      <div>
        {reviews.map((review, i) => (
          <ReviewCard key={review.id} review={review} id={review.id} />
        ))}
      </div>
    </div>
  )
}

export default Reviews;