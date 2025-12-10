// import React, { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import { authFetch } from "../../../utils/api"

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";

export default function MyAddedTickets(){
  const { user, getToken } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const token = await getToken();
      const data = await authFetch(`${import.meta.env.VITE_API_URL}/vendor/tickets?email=${encodeURIComponent(user.email)}`, token);
      setTickets(data);
    } catch(err){
      console.error(err);
      alert('Failed to load tickets');
    } finally { setLoading(false) }
  };

  useEffect(()=>{ if(user) load(); }, [user]);

  const handleDelete = async (id) => {
    if(!confirm('Delete ticket?')) return;
    try {
      const token = await getToken();
      await authFetch(`${import.meta.env.VITE_API_URL}/vendor/tickets/${id}`, token, { method: 'DELETE' });
      setTickets(prev => prev.filter(t=>t._id !== id));
    } catch(err){ console.error(err); alert('Delete failed'); }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">My Added Tickets</h2>
      {loading ? <p>Loading...</p> : null}
      <div className="grid md:grid-cols-3 gap-4">
        {tickets.map(t=>(
          <div key={t._id} className="bg-white p-3 rounded shadow">
            <img src={t.image} className="h-36 w-full object-cover rounded" />
            <h3 className="mt-2 font-bold">{t.title}</h3>
            <p>Price: ${t.price}</p>
            <p>Qty: {t.quantity}</p>
            <p>Status: <strong>{t.approved ? 'approved' : 'pending'}</strong></p>
            <div className="flex gap-2 mt-3">
              <button className="btn-secondary" disabled={t.approved===false && false}>Update</button>
              <button className="btn-danger" onClick={()=>handleDelete(t._id)} disabled={t.approved === false && false}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}