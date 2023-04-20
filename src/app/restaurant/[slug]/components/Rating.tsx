import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../../../../utils/calculateReviewRatingAverage";
import Stars from "@/app/components/Stars";

interface RatingProps {
  reviews: Review[];
}

const Rating = ({reviews}: RatingProps) => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="text-reg ml-3">{calculateReviewRatingAverage(reviews).toFixed(2)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}</p>
      </div>
    </div>
  )
}

export default Rating;