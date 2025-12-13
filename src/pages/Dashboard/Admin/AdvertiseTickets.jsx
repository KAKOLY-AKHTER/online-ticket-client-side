
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";

export default function AdvertiseTickets() {
  const { getToken } = useAuth();
  const [tickets, setTickets] = useState([]);
  // console.log(tickets);

  const load = async () => {
    const token = await getToken();
    const data = await authFetch(`${import.meta.env.VITE_API_URL}/admin/tickets`, token);
    // ✅ only approved tickets
    console.log(data);
    
    setTickets(data.filter(t => t.status === "approved"));

  };

  useEffect(() => {
   load();
   },
   []);

  const toggleAdvertise = async (id, advertised) => {
    // console.log(id,advertise);

    try {
      const token = await getToken();
      if (advertised && tickets.filter(t => t.advertised).length >= 6) {
        alert("Maximum 6 tickets can be advertised at a time");
        return;
      }

      await authFetch(`${import.meta.env.VITE_API_URL}/admin/tickets/${id}/advertise`, token, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ advertised })
      });
      load();
    } catch (err) {
      alert('Advertise failed: ' + err.message);
    }
  };

  return (
<div>
  <h2 className="text-3xl font-bold mb-6 text-indigo-700">Advertise Tickets</h2>
  <div className="grid gap-6 min-h-[200px]">
    {tickets.length === 0 && (
      <p className="text-gray-500 text-center italic">
        No approved tickets available for advertisement.
      </p>
    )}
    {tickets.map((t) => (
      <div
        key={t._id}
        className="bg-gradient-to-r from-indigo-50 to-white p-6 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-shadow"
      >
        {/* Left side: Ticket info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{t.title}</h3>
          <p className="text-sm text-gray-500">
            {t.vendorEmail} • <span className="font-medium text-indigo-600">৳{t.price}</span>
          </p>
        </div>

        {/* Right side: Advertise toggle */}
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              t.advertised
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {t.advertised ? "Advertised" : "Not Advertised"}
          </span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={t.advertised === true}
              onChange={(e) => toggleAdvertise(t._id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-indigo-600 relative transition-colors">
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transform transition-transform"></div>
            </div>
          </label>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
