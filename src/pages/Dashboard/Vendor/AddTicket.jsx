// import React, { useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import { authFetch } from "../../../utils/api";

import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";

export default function AddTicket() {
  const { user, getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const payload = {
      title: form.title.value,
      from: form.from.value,
      to: form.to.value,
      transportType: form.transportType.value,
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
      departureDate: form.date.value,
      departureTime: form.time.value,
      perks: Array.from(form.querySelectorAll('input[name="perks"]:checked')).map(n=>n.value),
      image: form.image.value,
      vendorName: user?.displayName || user?.email,
      vendorEmail: user?.email
    };

    try {
      const token = await getToken();
      await authFetch(`${import.meta.env.VITE_API_URL}/tickets`, token, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      alert('Ticket added (pending approval)');
      form.reset();
    } catch (err) {
      console.error(err);
      alert('Failed to add ticket: '+err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add Ticket</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input name="title" placeholder="Title" className="input" required/>
        <div className="grid grid-cols-2 gap-2">
          <input name="from" placeholder="From" className="input" required/>
          <input name="to" placeholder="To" className="input" required/>
        </div>
        <select name="transportType" className="input">
          <option>Bus</option>
          <option>Train</option>
          <option>Launch</option>
          <option>Plane</option>
        </select>
        <div className="grid grid-cols-2 gap-2">
          <input name="price" type="number" placeholder="Price" className="input" required/>
          <input name="quantity" type="number" placeholder="Quantity" className="input" required/>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input name="date" type="date" className="input" required/>
          <input name="time" type="time" className="input" required/>
        </div>

        <div>
          <label className="block mb-1">Perks</label>
          <div className="flex gap-3 flex-wrap">
            {["AC","Wifi","Breakfast","Snacks","Water"].map(p=>(
              <label key={p} className="flex items-center gap-2">
                <input name="perks" type="checkbox" value={p} />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>

        <input name="image" placeholder="Image URL" className="input" required />

        <div className="flex gap-2">
          <input value={user?.displayName || ''} readOnly className="input flex-1" />
          <input value={user?.email || ''} readOnly className="input flex-1" />
        </div>

        <button className="btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Ticket'}
        </button>
      </form>
    </div>
  );
}
