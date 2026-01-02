import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBookings,
  updateBookingStatus,
  sendPaymentQr,
} from "@/store/admin/booking-slice";

function AdminBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((s) => s.adminBookings);

  const [selectedQr, setSelectedQr] = useState({});

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  function handleQrUpload(bookingId) {
    const qrFile = selectedQr[bookingId];

    if (!qrFile) {
      alert("Please select a QR image first");
      return;
    }

    const formData = new FormData();
    formData.append("qr", qrFile);

    dispatch(sendPaymentQr({ id: bookingId, data: formData }));
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="border rounded-xl p-5 shadow-sm bg-white"
          >
            {/* USER INFO */}
            <div className="mb-3">
              <p className="font-semibold text-lg">
                {b.userName}
              </p>
              <p className="text-sm text-gray-500">
                {b.email}
              </p>
            </div>

            {/* PRODUCT INFO */}
            <div className="text-sm mb-3">
              <p>
                <b>Product:</b> {b.productName}
              </p>
              <p>
                <b>Size:</b> {b.size}
              </p>
              <p>
                <b>Booking ID:</b> {b.bookingId}
              </p>
            </div>

            {/* STATUS */}
            <p className="mb-3">
              <b>Status:</b>{" "}
              <span
                className={`capitalize px-2 py-1 rounded text-sm ${
                  b.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : b.status === "contacted"
                    ? "bg-yellow-100 text-yellow-700"
                    : b.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {b.status || "pending"}
              </span>
            </p>

            {/* STATUS ACTIONS */}
            <div className="flex gap-3 mb-4">
              <button
                className="px-4 py-1 rounded bg-yellow-500 text-white text-sm"
                onClick={() =>
                  dispatch(
                    updateBookingStatus({
                      id: b._id,
                      status: "contacted",
                    })
                  )
                }
              >
                Contacted
              </button>

              <button
                className="px-4 py-1 rounded bg-green-600 text-white text-sm"
                onClick={() =>
                  dispatch(
                    updateBookingStatus({
                      id: b._id,
                      status: "confirmed",
                    })
                  )
                }
              >
                Confirm
              </button>

              <button
                className="px-4 py-1 rounded bg-red-600 text-white text-sm"
                onClick={() =>
                  dispatch(
                    updateBookingStatus({
                      id: b._id,
                      status: "cancelled",
                    })
                  )
                }
              >
                Cancel
              </button>
            </div>

            {/* PAYMENT QR */}
            <div className="border-t pt-3">
              {b.paymentQr ? (
                <p className="text-green-600 text-sm font-medium">
                  ✅ Payment QR already sent
                </p>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="text-sm"
                    onChange={(e) =>
                      setSelectedQr({
                        ...selectedQr,
                        [b._id]: e.target.files[0],
                      })
                    }
                  />

                  <button
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                    onClick={() => handleQrUpload(b._id)}
                  >
                    Upload QR
                  </button>
                </div>
              )}
            </div>

            {/* WHATSAPP */}
            {b.paymentQr && (
              <a
                href={`https://wa.me/${b.phone}?text=${encodeURIComponent(
                  `Hello ${b.userName},

Please complete payment for your booking.

Booking ID: ${b.bookingId}
Product: ${b.productName} (${b.size})

Scan QR to pay:
${window.location.origin}${b.paymentQr}

Thank you.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-green-600 text-sm underline"
              >
                Send WhatsApp Payment Request
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBookings;
