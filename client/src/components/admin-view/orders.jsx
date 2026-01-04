import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
  deleteOrderForAdmin,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector(
    (state) => state.adminOrder
  );
  const dispatch = useDispatch();

  function handleFetchOrderDetails(id) {
    dispatch(getOrderDetailsForAdmin(id));
  }

  function handleDeleteOrder(id) {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    dispatch(deleteOrderForAdmin(id)).then(() => {
      dispatch(getAllOrdersForAdmin());
    });
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails) setOpenDetailsDialog(true);
  }, [orderDetails]);

  function getOrderPrice(order) {
    if (order?.totalAmount > 0) return order.totalAmount;
    if (Array.isArray(order?.cartItems)) {
      return order.cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      );
    }
    return 0;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>

      <CardContent>
        {/* ================= MOBILE VIEW ================= */}
        <div className="space-y-4 md:hidden">
          {orderList?.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 space-y-2"
            >
              <p className="text-xs break-all">
                <strong>ID:</strong> {order._id}
              </p>

              <p className="text-sm">
                <strong>Date:</strong>{" "}
                {order.orderDate?.split("T")[0]}
              </p>

              <Badge
                className={`${
                  order.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : order.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {order.orderStatus}
              </Badge>

              <p className="font-semibold">
                ₹{getOrderPrice(order).toLocaleString("en-IN")}
              </p>

              <div className="flex gap-2">
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={() => {
                    setOpenDetailsDialog(false);
                    dispatch(resetOrderDetails());
                  }}
                >
                  <Button
                    size="sm"
                    onClick={() => handleFetchOrderDetails(order._id)}
                  >
                    View
                  </Button>

                  <AdminOrderDetailsView
                    orderDetails={orderDetails}
                  />
                </Dialog>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= DESKTOP / TABLET VIEW ================= */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orderList?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    {order.orderDate?.split("T")[0]}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`${
                        order.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : order.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      }`}
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>

                  <TableCell className="font-semibold">
                    ₹{getOrderPrice(order).toLocaleString("en-IN")}
                  </TableCell>

                  <TableCell className="flex gap-2">
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        size="sm"
                        onClick={() =>
                          handleFetchOrderDetails(order._id)
                        }
                      >
                        View
                      </Button>

                      <AdminOrderDetailsView
                        orderDetails={orderDetails}
                      />
                    </Dialog>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        handleDeleteOrder(order._id)
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
