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

  /* ---------------- FILTER USERS ---------------- */
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.userName?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  /* ---------------- DELETE USER ---------------- */
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

  /* ---------------- EXPORT EMAILS ---------------- */
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
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Registered Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage users, orders, and campaigns
          </p>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[220px]"
          />

          <Button variant="outline" onClick={exportEmails}>
            Export Emails
          </Button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
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
                <td className="p-3 text-muted-foreground">{user.email}</td>
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
