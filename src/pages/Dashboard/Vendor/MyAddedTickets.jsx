

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";

export default function MyAddedTickets() {
  const { user, getToken } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const token = await getToken();
      const data = await authFetch(`${import.meta.env.VITE_API_URL}/vendor/tickets?email=${encodeURIComponent(user.email)}`, token);
      setTickets(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load tickets');
    } finally { setLoading(false) }
  };

  useEffect(() => { if (user) load(); }, [user]);

  const handleDelete = async (id) => {
    if (!confirm('Delete ticket?')) return;
    try {
      const token = await getToken();
      await authFetch(`${import.meta.env.VITE_API_URL}/vendor/tickets/${id}`, token, { method: 'DELETE' });
      setTickets(prev => prev.filter(t => t._id !== id));
    } catch (err) { console.error(err); alert('Delete failed'); }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">My Added Tickets</h2>
      {loading ? <p>Loading...</p> : null}
      <div className="grid md:grid-cols-3 gap-6">
        {tickets.map(t => (
          <div key={t._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={t.image} alt={t.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{t.title}</h3>
              <p className="text-sm text-gray-600">Price: ${t.price}</p>
              <p className="text-sm text-gray-600">Quantity: {t.quantity}</p>
              <p className="text-sm mt-2">
                Status: <span className={`font-semibold ${t.rejected ? 'text-red-600' :
                    t.approved ? 'text-green-600' :
                      'text-yellow-600'
                  }`}>
                  {t.rejected ? 'Rejected' : t.approved ? 'Approved' : 'Pending'}
                </span>
              </p>

              <div className="flex gap-2 mt-4">
                <button className="btn btn-secondary btn-sm" disabled={t.approved}>Update</button>
                <button className="btn btn-error btn-sm" onClick={() => handleDelete(t._id)} disabled={t.approved}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}