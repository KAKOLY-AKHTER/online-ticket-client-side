

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";

export default function RequestedBookings(){
  const { user, getToken } = useAuth();
  const [requests, setRequests] = useState([]);

  const load = async () => {
    try {
      const token = await getToken();
      const data = await authFetch(`${import.meta.env.VITE_API_URL}/vendor/requests?email=${encodeURIComponent(user.email)}`, token);
      setRequests(data);
    } catch(err){ console.error(err); alert('Load failed') }
  };

  useEffect(()=>{ if(user) load(); }, [user]);

  const changeStatus = async (id, status) => {
    try {
      const token = await getToken();
      await authFetch(`${import.meta.env.VITE_API_URL}/vendor/bookings/${id}/status`, token, {
        method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ status })
      });
      setRequests(prev => prev.map(r => r._id === id ? { ...r, status } : r));
    } catch(err){ console.error(err); alert('Update failed') }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Requested Bookings</h2>
      <table className="w-full bg-white rounded shadow">
        <thead><tr><th>User</th><th>Ticket</th><th>Qty</th><th>Total</th><th>Actions</th></tr></thead>
        <tbody>
          {requests.map(r => (
            <tr key={r._id} className="border-b">
              <td>{r.userEmail}</td>
              <td>{r.title}</td>
              <td>{r.quantity}</td>
              <td>${r.totalPrice}</td>
              <td className="flex gap-2">
                <button className="btn-primary" onClick={()=>changeStatus(r._id,'accepted')}>Accept</button>
                <button className="btn-danger" onClick={()=>changeStatus(r._id,'rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
