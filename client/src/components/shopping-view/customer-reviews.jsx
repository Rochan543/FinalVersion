import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { addReview } from "@/store/shop/review-slice";
import { useToast } from "../ui/use-toast";

function CustomerReviews({ productId, reviews = [] }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const [rating, setRating] = useState(0);
  const [reviewMsg, setReviewMsg] = useState("");

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) / totalReviews
      : 0;

  function handleSubmitReview() {
    if (!rating || !reviewMsg.trim()) {
      toast({
        title: "Please give rating and review",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addReview({
        productId,
        userId: user?._id, // ✅ FIXED
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        toast({
          title: "Review not allowed",
          description: res.payload,
          variant: "destructive",
        });
      }

      if (res.payload?.success) {
        setRating(0);
        setReviewMsg("");
        toast({
          title: "Review submitted",
          description: "Waiting for admin approval",
        });
      }
    });
  }

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

      {/* SUMMARY */}
      <div className="mb-8">
        <h1 className="text-5xl font-extrabold">
          {averageRating.toFixed(1)}
        </h1>
        <StarRatingComponent rating={averageRating} />
        <p className="text-muted-foreground">
          {totalReviews} reviews
        </p>
      </div>

      {/* WRITE REVIEW */}
      {user && (
        <div className="mb-12 border p-6 rounded-lg">
          <Label className="block mb-2">Write a review</Label>

          <StarRatingComponent
            rating={rating}
            handleRatingChange={setRating}
          />

          <Input
            className="mt-3"
            value={reviewMsg}
            onChange={(e) => setReviewMsg(e.target.value)}
            placeholder="Write your review..."
          />

          <Button className="mt-4" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </div>
      )}

      {/* REVIEW LIST */}
      {reviews.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="border rounded-xl p-5 bg-white shadow-sm"
            >
              <StarRatingComponent rating={r.reviewValue} />
              <h3 className="font-bold mt-2">{r.userName}</h3>
              <p className="text-muted-foreground mt-2">
                {r.reviewMessage}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No reviews yet. Be the first to review.
        </p>
      )}
    </div>
  );
}

export default CustomerReviews;
