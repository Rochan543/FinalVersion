import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubscribers,
  deleteSubscriber, // ✅ ADDED
} from "@/store/subscriber-slice";

function AdminSubscribers() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.subscriber);

  useEffect(() => {
    dispatch(fetchSubscribers());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Email Subscribers
      </h1>

      <div className="bg-white border rounded-lg">
        {list.map((sub) => (
          <div
            key={sub._id}
            className="flex justify-between items-center px-4 py-3 border-b"
          >
            {/* LEFT SIDE (EXISTING CONTENT) */}
            <div>
              <span>{sub.email}</span>
              <div className="text-sm text-gray-500">
                {new Date(sub.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* RIGHT SIDE (ADDED DELETE OPTION) */}
            <button
              onClick={() => dispatch(deleteSubscriber(sub._id))}
              className="text-red-600 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        ))}

        {!list.length && (
          <p className="p-4 text-gray-500">
            No subscribers yet
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminSubscribers;
