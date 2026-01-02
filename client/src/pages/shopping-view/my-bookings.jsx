import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings } from "@/store/shop/booking-slice";
import Footer from "@/components/common/Footer";

function MyBookings() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { bookings } = useSelector((s) => s.shopBookings);

  useEffect(() => {
    // 🔥 FIX: use user.id, NOT user._id
    if (user?.id) {
      dispatch(fetchUserBookings());
    }
  }, [dispatch, user?.id]);

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

        {bookings.length === 0 && <p>No bookings yet.</p>}

        {bookings.map((b) => (
          <div key={b.bookingId} className="border p-4 mb-4 rounded">
            <p>
              <b>Booking ID:</b> {b.bookingId}
            </p>

            <p>
              <b>Product:</b> {b.productName}
            </p>

            <p>
              <b>Size:</b> {b.size}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span className="capitalize text-gray-600">
                {b.status || "pending"}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default MyBookings;
