import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating = 0, handleRatingChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}   // ✅ REQUIRED
          type="button"
          variant="outline"
          size="icon"
          className={`p-2 rounded-full transition-colors ${
            star <= rating
              ? "text-yellow-500"
              : "text-gray-400"
          }`}
          onClick={
            handleRatingChange
              ? () => handleRatingChange(star)
              : undefined
          }
        >
          <StarIcon
            className={`w-5 h-5 ${
              star <= rating ? "fill-yellow-500" : "fill-transparent"
            }`}
          />
        </Button>
      ))}
    </div>
  );
}

export default StarRatingComponent;
