// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";
// import { authFetch } from "../../../Utils/api";

import { useNavigate, useParams } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { authFetch } from "../../../../Utils/api";

export default function UpdateTicket() {
  const { id } = useParams();
  const { user, getToken } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const token = await getToken();
      const data = await authFetch(`${import.meta.env.VITE_API_URL}/vendor/tickets/${id}`, token);
      setTicket(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load ticket");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
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
      perks: Array.from(form.querySelectorAll('input[name="perks"]:checked')).map(n => n.value),
      image: form.image.value,
    };

    try {
      const token = await getToken();
      await authFetch(`${import.meta.env.VITE_API_URL}/vendor/tickets/${id}`, token, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("Ticket updated");
      navigate("/dashboard/vendor/my-added-tickets");
    } catch (err) {
      console.error(err);
      alert("Update failed: " + err.message);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!ticket) return <p className="p-6">Ticket not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Update Ticket</h2>
      <form onSubmit={handleUpdate} className="grid gap-3">
        <input name="title" defaultValue={ticket.title} className="input" required />
        <div className="grid grid-cols-2 gap-2">
          <input name="from" defaultValue={ticket.from} className="input" required />
          <input name="to" defaultValue={ticket.to} className="input" required />
        </div>
        <select name="transportType" defaultValue={ticket.transportType} className="input">
          <option>Bus</option>
          <option>Train</option>
          <option>Launch</option>
          <option>Plane</option>
        </select>
        <div className="grid grid-cols-2 gap-2">
          <input name="price" type="number" defaultValue={ticket.price} className="input" required />
          <input name="quantity" type="number" defaultValue={ticket.quantity} className="input" required />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input name="date" type="date" defaultValue={ticket.departureDate} className="input" required />
          <input name="time" type="time" defaultValue={ticket.departureTime} className="input" required />
        </div>
        <div>
          <label className="block mb-1">Perks</label>
          <div className="flex gap-3 flex-wrap">
            {["AC", "Wifi", "Breakfast", "Snacks", "Water"].map((p) => (
              <label key={p} className="flex items-center gap-2">
                <input
                  name="perks"
                  type="checkbox"
                  value={p}
                  defaultChecked={ticket.perks?.includes(p)}
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>
        <input name="image" defaultValue={ticket.image} className="input" required />
        <button className="btn btn-primary">Update Ticket</button>
      </form>
    </div>
  );
}
