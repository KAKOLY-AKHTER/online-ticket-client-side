import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";



export default function RequestedBookings() {
  const { user, getToken } = useAuth();
  const [requests, setRequests] = useState([]);

  const load = async () => {
    try {
      const token = await getToken();
      const data = await authFetch(
        `${import.meta.env.VITE_API_URL}/vendor/requests?email=${encodeURIComponent(user.email)}`,
        token
      );
      setRequests(data);
    } catch (err) {
      console.error(err);
      alert("Load failed");
    }
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  const changeStatus = async (id, status) => {
    try {
      const token = await getToken();
      await authFetch(`${import.meta.env.VITE_API_URL}/vendor/bookings/${id}/status`, token, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Requested Bookings</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-50 text-sm">
            <tr>
              <th className="p-3 font-semibold text-gray-700">User</th>
              <th className="p-3 font-semibold text-gray-700">Ticket</th>
              <th className="p-3 font-semibold text-gray-700">Qty</th>
              <th className="p-3 font-semibold text-gray-700">Total</th>
              <th className="p-3 font-semibold text-gray-700">Status</th>
              <th className="p-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 text-sm">{r.userEmail}</td>
                <td className="p-3 text-sm">{r.title}</td>
                <td className="p-3 text-sm">{r.quantity}</td>
                <td className="p-3 text-sm">${r.totalPrice}</td>
                <td className="p-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      r.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : r.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {r.status || "Pending"}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-50"
                    onClick={() => changeStatus(r._id, "accepted")}
                    disabled={r.status}
                  >
                    Accept
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-50"
                    onClick={() => changeStatus(r._id, "rejected")}
                    disabled={r.status}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500 text-sm">
                  No booking requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
