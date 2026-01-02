import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URL } from "@/config/apiConfig";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function AdminUserOrders() {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(
          `${API_URL}/api/admin/users/${userId}/orders`,
          { withCredentials: true }
        );
        setOrders(res.data?.data || []);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <Skeleton className="w-full h-[350px]" />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold">User Orders</h1>
        <p className="text-sm text-muted-foreground">
          All orders placed by the selected user
        </p>
      </div>

      {/* ================= ORDERS ================= */}
      {orders.map((order) => (
        <Card key={order._id}>
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono text-sm">{order._id}</p>
            </div>

            <div className="flex gap-2">
              <Badge
                variant={
                  order.orderStatus === "delivered"
                    ? "success"
                    : "secondary"
                }
              >
                {order.orderStatus}
              </Badge>

              <Badge
                variant={
                  order.paymentStatus === "paid"
                    ? "success"
                    : "destructive"
                }
              >
                {order.paymentStatus}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* -------- SUMMARY -------- */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <p className="text-muted-foreground">Total Amount</p>
                <p className="font-semibold text-lg">
                  ₹{order.totalAmount}
                </p>
              </div>
            </div>

            {/* -------- ITEMS -------- */}
            <div className="space-y-4">
              {order.cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 items-center border rounded-lg p-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="font-semibold">
                    ₹{item.price}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* ================= EMPTY STATE ================= */}
      {orders.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No orders found for this user
        </div>
      )}
    </div>
  );
}

export default AdminUserOrders;
