
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";

export default function ManageTickets() {
  const { getToken } = useAuth();
  const [tickets, setTickets] = useState([]);

  const load = async () => {
    const token = await getToken();
    const data = await authFetch(`${import.meta.env.VITE_API_URL}/admin/tickets`, token);
    setTickets(data.filter((t) => t.status === "pending"));

    // setTickets(data);
    // setTickets(data.filter(t => t.status === "pending"));
    // setTickets(data.filter(t => t.status === "approved"));
    // setTickets(data.filter(t => t.status?.toLowerCase() === "pending"));



    console.log(data);


  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = await getToken();
      const res = await authFetch(
        `${import.meta.env.VITE_API_URL}/admin/tickets/${id}`,
        token,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status })
        }
      );
      alert("Status updated");
      load();
    } catch (err) {
      console.error(err);
      alert("Failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Tickets</h2>
      <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-blue-100 text-blue-800 font-semibold">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Vendor</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Qty</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t._id} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-2 font-medium">{t.title}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{t.vendorEmail || "—"}</td>
              <td className="px-4 py-2">${t.price}</td>
              <td className="px-4 py-2">{t.quantity}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${t.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : t.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {t.status === "approved" && "✔ Approved"}
                  {t.status === "rejected" && "✘ Rejected"}
                  {t.status === "pending" && "Pending"}
                </span>

              </td>
              <td className="px-4 py-2 flex gap-2 justify-center">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded"
                  onClick={() => updateStatus(t._id, "approved")}
                >
                  ✔ Approve
                </button>

                <button
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={() => updateStatus(t._id, "rejected")}
                >
                  ✘ Reject
                </button>
              </td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}
