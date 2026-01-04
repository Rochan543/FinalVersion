import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import AdminOrdersView from "@/components/admin-view/orders";

function AdminOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  return <AdminOrdersView />;
}

export default AdminOrders;
