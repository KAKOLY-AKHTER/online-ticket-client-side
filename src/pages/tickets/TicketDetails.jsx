


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";


const TicketDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTicket(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ticket:", err);
        setLoading(false);
      });
  }, [id]);

  // realtime countdown (updates every second)
  useEffect(() => {
    if (!ticket) return;
    const tick = () => {
      const departure = new Date(`${ticket.departureDate}T${ticket.departureTime}:00`);
      const now = new Date();
      const diff = departure - now;
      if (isNaN(departure.getTime())) {
        setCountdown("Invalid departure time");
        return;
      }
      if (diff <= 0) {
        setCountdown("Departure time passed");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`);
      }
    };

    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [ticket]);

  const handleBooking = async () => {
    if (!ticket) return;
    if (quantity < 1 || quantity > ticket.quantity) {
      toast.error("Invalid booking quantity");
      return;
    }

    const token = localStorage.getItem("access-token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    // ticket._id may be either _id or id; handle fallback
    const ticketId = ticket._id || ticket.id;

    const booking = {
      ticketId,
      quantity,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`,  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(booking),
      });

      if (res.status === 401) {
        toast.error("Unauthorized. Please login again.");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        toast.error(err?.message || "Booking failed");
        return;
      }

      const data = await res.json();
      toast.success("Booking successful! Status: Pending");
      setShowModal(false);
      navigate("/dashboard/user/my-booked-tickets");
    } catch (err) {
      console.error(err);
      toast.error("Booking failed due to network error");
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (!ticket) return <p className="text-center mt-10">Ticket not found</p>;

  const departure = new Date(`${ticket.departureDate}T${ticket.departureTime}:00`);
  const departurePassed = !isNaN(departure.getTime()) && departure < new Date();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img src={ticket.image} alt={ticket.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">{ticket.title}</h2>
      <p><strong>Route:</strong> {ticket.from} → {ticket.to}</p>
      <p><strong>Transport:</strong> {ticket.transportType}</p>
      <p><strong>Price:</strong> ৳{ticket.price}</p>
      <p><strong>Available:</strong> {ticket.quantity}</p>
      <p><strong>Departure:</strong> {ticket.departureDate} {ticket.departureTime}</p>
      <p><strong>Countdown:</strong> {countdown}</p>
      <p className="mt-3">{ticket.description}</p>

      <div className="flex gap-2 mt-4">
        {ticket.perks?.map((p, i) => <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">{p}</span>)}
      </div>

      <button
        disabled={departurePassed || ticket.quantity === 0}
        onClick={() => setShowModal(true)}
        className={`mt-6 px-6 py-2 rounded text-white ${departurePassed || ticket.quantity === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
      >
        Book Now
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Book Ticket</h3>
            <input
              type="number"
              min="1"
              max={ticket.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <div className="flex gap-2">
              <button onClick={handleBooking} className="flex-1 bg-indigo-600 text-white py-2 rounded">Confirm Booking</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-300 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;