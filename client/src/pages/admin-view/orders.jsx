import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId } from "@/store/shop/order-slice";
import AdminOrdersView from "@/components/admin-view/orders"; // ✅ MISSING IMPORT

function AdminOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id)); // ✅ SAME FUNCTIONALITY
    }
  }, [user, dispatch]);

  return <AdminOrdersView />;
}

export default AdminOrders; // ✅ REQUIRED DEFAULT EXPORT
