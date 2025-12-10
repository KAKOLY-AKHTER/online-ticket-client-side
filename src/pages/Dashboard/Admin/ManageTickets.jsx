// import React, { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import { authFetch } from "../../../utils/api";

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";

export default function ManageTickets(){
  const { getToken } = useAuth();
  const [tickets, setTickets] = useState([]);

  const load = async () => {
    const token = await getToken();
    const data = await authFetch(`${import.meta.env.VITE_API_URL}/admin/tickets`, token);
    setTickets(data);
  };
  useEffect(()=>{ load(); }, []);

  const setApprove = async (id, approve) => {
    const token = await getToken();
    await authFetch(`${import.meta.env.VITE_API_URL}/admin/tickets/${id}/approve`, token, {
      method: 'PATCH',
      body: JSON.stringify({ approve })
    });
    load();
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Manage Tickets</h2>
      <table className="w-full bg-white rounded shadow">
        <thead><tr><th>Title</th><th>Vendor</th><th>Price</th><th>Qty</th><th>Approved</th><th>Actions</th></tr></thead>
        <tbody>
          {tickets.map(t=>(
            <tr key={t._id} className="border-b">
              <td>{t.title}</td>
              <td>{t.vendorEmail}</td>
              <td>${t.price}</td>
              <td>{t.quantity}</td>
              <td>{t.approved ? 'Yes' : 'No'}</td>
              <td className="flex gap-2">
                <button className="btn-primary" onClick={()=>setApprove(t._id, true)}>Approve</button>
                <button className="btn-danger" onClick={()=>setApprove(t._id, false)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
