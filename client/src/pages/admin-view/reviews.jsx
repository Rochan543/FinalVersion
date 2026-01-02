import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminReviews,
  updateReviewStatus,
  replyToReview,
  deleteReview,
} from "@/store/admin/review-slice";

function AdminReviews() {
  const dispatch = useDispatch();

  // ✅ CORRECT selector (matches store key)
  const { reviews, isLoading, error } = useSelector(
    (state) => state.adminReview
  );

  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    dispatch(fetchAdminReviews());
  }, [dispatch]);

  if (isLoading) {
    return <p className="p-6">Loading reviews...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Product Reviews</h1>

      {reviews.length === 0 && (
        <p className="text-muted-foreground">No reviews found.</p>
      )}

      {reviews.map((r) => (
        <div
          key={r._id}
          className="border p-4 mb-4 rounded bg-white shadow-sm"
        >
          {/* REVIEW INFO */}
          <p className="font-semibold">{r.userName}</p>
          <p>⭐ {r.reviewValue}</p>
          <p className="text-sm">{r.reviewMessage}</p>

          <p className="text-xs mt-1">
            Status: <b>{r.status}</b>
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mt-3">
            <button
              onClick={() =>
                dispatch(
                  updateReviewStatus({
                    id: r._id,
                    status: "approved",
                  })
                )
              }
            >
              Approve
            </button>

            <button
              onClick={() =>
                dispatch(
                  updateReviewStatus({
                    id: r._id,
                    status: "rejected",
                  })
                )
              }
            >
              Reject
            </button>

            <button
              className="text-red-600"
              onClick={() => dispatch(deleteReview(r._id))}
            >
              Delete
            </button>
          </div>

          {/* ADMIN REPLY */}
          <div className="mt-3">
            <input
              className="border px-2 py-1 mr-2"
              placeholder="Admin reply"
              value={replyText[r._id] || ""}
              onChange={(e) =>
                setReplyText({
                  ...replyText,
                  [r._id]: e.target.value,
                })
              }
            />
            <button
              onClick={() =>
                dispatch(
                  replyToReview({
                    id: r._id,
                    reply: replyText[r._id],
                  })
                )
              }
            >
              Reply
            </button>
          </div>

          {/* SHOW EXISTING ADMIN REPLY */}
          {r.adminReply && (
            <div className="mt-2 text-sm bg-gray-100 p-2 rounded">
              <b>Admin Reply:</b> {r.adminReply}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminReviews;
