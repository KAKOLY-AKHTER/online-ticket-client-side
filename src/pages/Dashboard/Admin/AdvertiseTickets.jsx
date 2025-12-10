// import React, { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import { authFetch } from "../../../utils/api";

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";

export default function AdvertiseTickets(){
  const { getToken } = useAuth();
  const [tickets, setTickets] = useState([]);

  const load = async () => {
    const token = await getToken();
    const data = await authFetch(`${import.meta.env.VITE_API_URL}/admin/tickets`, token);
    setTickets(data);
  };

  useEffect(()=>{ load(); }, []);

  const toggleAdvertise = async (id, advertise) => {
    try {
      const token = await getToken();
      await authFetch(`${import.meta.env.VITE_API_URL}/admin/tickets/${id}/advertise`, token, {
        method: 'PATCH',
        body: JSON.stringify({ advertise })
      });
      load();
    } catch(err) {
      alert('Advertise failed: ' + err.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Advertise Tickets</h2>
      <div className="grid gap-4">
        {tickets.map(t=>(
          <div key={t._id} className="bg-white p-4 rounded shadow flex items-center justify-between">
            <div>
              <h3 className="font-bold">{t.title}</h3>
              <p className="text-sm">{t.vendorEmail} • ${t.price}</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-primary" disabled={t.advertised} onClick={()=>toggleAdvertise(t._id, true)}>Advertise</button>
              <button className="btn-danger" disabled={!t.advertised} onClick={()=>toggleAdvertise(t._id, false)}>Unadvertise</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
