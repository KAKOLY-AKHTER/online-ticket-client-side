
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";
import { useNavigate } from "react-router";

export default function AddTicket() {
  const { user, getToken } = useAuth();
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();

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
      vendorEmail: user?.email,
       status: "pending" 
    };

    try {
      const token = await getToken();
      await authFetch(`${import.meta.env.VITE_API_URL}/tickets`, token, {
        method: 'POST',
         headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(payload)
      });
      alert('Ticket added (pending approval)');
        navigate("/dashboard/vendor/my-added-tickets");
      form.reset();
    } catch (err) {
      console.error(err);
      alert('Failed to add ticket: '+err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-3xl font-bold mb-6 text-blue-600">Add Ticket</h2>
  <form onSubmit={handleSubmit} className="grid gap-4">
    <input name="title" placeholder="Ticket Title" className="input input-bordered w-full" required />

    <div className="grid grid-cols-2 gap-4">
      <input name="from" placeholder="From (Location)" className="input input-bordered" required />
      <input name="to" placeholder="To (Location)" className="input input-bordered" required />
    </div>

    <select name="transportType" className="select select-bordered w-full">
      <option>Bus</option>
      <option>Train</option>
      <option>Launch</option>
      <option>Plane</option>
    </select>

    <div className="grid grid-cols-2 gap-4">
      <input name="price" type="number" placeholder="Price per unit" className="input input-bordered" required />
      <input name="quantity" type="number" placeholder="Quantity" className="input input-bordered" required />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <input name="date" type="date" className="input input-bordered" required />
      <input name="time" type="time" className="input input-bordered" required />
    </div>

    <div>
      <label className="block font-semibold mb-2">Perks</label>
      <div className="flex flex-wrap gap-4">
        {["AC", "Wifi", "Breakfast", "Snacks", "Water"].map(p => (
          <label key={p} className="flex items-center gap-2">
            <input name="perks" type="checkbox" value={p} className="checkbox" />
            <span>{p}</span>
          </label>
        ))}
      </div>
    </div>

    <input name="image" placeholder="Image URL (imgbb)" className="input input-bordered w-full" required />

    <div className="grid grid-cols-2 gap-4">
      <input value={user?.displayName || ''} readOnly className="input input-bordered" />
      <input value={user?.email || ''} readOnly className="input input-bordered" />
    </div>

    <button className="btn btn-primary w-full mt-4" disabled={loading}>
      {loading ? 'Adding...' : 'Add Ticket'}
    </button>
  </form>
</div>

  );
}
