import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "@/config/apiConfig";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get(
          `${API_URL}/api/admin/users/get`,
          { withCredentials: true }
        );
        setUsers(res.data?.data || []);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  /* ================= FILTER USERS ================= */
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.userName?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  /* ================= DELETE USER ================= */
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?\nThis action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(userId);

      await axios.delete(
        `${API_URL}/api/admin/users/${userId}`,
        { withCredentials: true }
      );

      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } finally {
      setDeletingId(null);
    }
  };

  /* ================= EXPORT EMAILS ================= */
  const exportEmails = () => {
    const emails = users.map((u) => u.email).join("\n");
    const blob = new Blob([emails], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "registered_users_emails.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <Skeleton className="w-full h-[350px]" />;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Registered Users
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage users, orders, and campaigns
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-[220px]"
          />

          <Button variant="outline" onClick={exportEmails}>
            Export Emails
          </Button>
        </div>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="space-y-4 md:hidden">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="border rounded-lg p-4 space-y-2"
          >
            <p className="font-medium">{user.userName}</p>

            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>

            <p className="text-sm">
              <strong>Phone:</strong> {user.phone || "-"}
            </p>

            <p className="text-sm text-muted-foreground">
              <strong>Address:</strong>{" "}
              {user.address
                ? `${user.address.city || ""} ${user.address.pincode || ""}`
                : "-"}
            </p>

            <span className="inline-block px-2 py-1 rounded text-xs bg-blue-100 text-blue-700 capitalize">
              {user.role}
            </span>

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="link"
                onClick={() => navigate(`/admin/users/${user._id}`)}
              >
                View Orders
              </Button>

              <Button
                size="sm"
                variant="destructive"
                disabled={deletingId === user._id}
                onClick={() => handleDelete(user._id)}
              >
                {deletingId === user._id ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TABLET / DESKTOP VIEW ================= */}
      <div className="hidden md:block rounded-lg border overflow-x-auto">
        <table className="w-full text-sm min-w-[1000px]">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-muted/50 transition"
              >
                <td className="p-3 font-medium">{user.userName}</td>

                <td className="p-3 text-muted-foreground">
                  {user.email}
                </td>

                <td className="p-3">{user.phone || "-"}</td>

                <td className="p-3 text-muted-foreground">
                  {user.address
                    ? `${user.address.city || ""} ${user.address.pincode || ""}`
                    : "-"}
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700 capitalize">
                    {user.role}
                  </span>
                </td>

                <td className="p-3 text-right space-x-2">
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => navigate(`/admin/users/${user._id}`)}
                  >
                    View Orders
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={deletingId === user._id}
                    onClick={() => handleDelete(user._id)}
                  >
                    {deletingId === user._id ? "Deleting..." : "Delete"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
