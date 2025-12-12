// import React, { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import { authFetch } from "../../../utils/api";

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
    setTickets(data);
  };

  useEffect(() => { load(); }, []);

  const toggleAdvertise = async (id, advertise) => {
    // console.log(id,advertise);
    
    try {
      const token = await getToken();
    if (advertise && tickets.filter(t => t.advertised === true).length >= 6)
 {
      alert("Maximum 6 tickets can be advertised at a time");
      return;
    }

      await authFetch(`${import.meta.env.VITE_API_URL}/admin/tickets/${id}/advertise`, token, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ approve: true })
      });
      load();
    } catch (err) {
      alert('Advertise failed: ' + err.message);
    }
  };

  return (
       <div>
      <h2 className="text-2xl mb-4">Advertise Tickets</h2>
      <div className="grid gap-4 min-h-[200px]">
        {tickets.length === 0 && (
          <p className="text-gray-500">No approved tickets available for advertisement.</p>
        )}
        {tickets.map(t => (
          <div key={t._id} className="bg-white p-4 rounded shadow flex items-center justify-between">
            <div>
              <h3 className="font-bold">{t.title}</h3>
              <p className="text-sm">{t.vendorEmail} • ${t.price}</p>
            </div>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded text-white ${t.advertised ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                disabled={t.advertised === true}
                onClick={() => toggleAdvertise(t._id, true)}
              >
                Advertise
              </button>
              <button
                className={`px-3 py-1 rounded text-white ${!t.advertised ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                disabled={t.advertised === false}
                onClick={() => toggleAdvertise(t._id, false)}
              >
                Un-advertise
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
