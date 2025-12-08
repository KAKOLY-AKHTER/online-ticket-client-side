// import { useEffect, useState } from "react";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import Container from "../../../components/Shared/Container";

import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";


// const MyBookedTickets = () => {
//   const [bookings, setBookings] = useState([]);
//   // console.log(bookings)
//   const [loading, setLoading] = useState(true);

// useEffect(() => {
// const token = localStorage.getItem("access-token");
// console.log("Token being sent:", token);


//   fetch("http://localhost:3000/bookings", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//         console.log("Fetched bookings:", data);
//       setBookings(data);
//       setLoading(false);
//     })
//     .catch((err) => {
//       console.error("Error fetching bookings:", err);
//       setLoading(false);
//     });
// }, []);


//   if (loading) return <LoadingSpinner></LoadingSpinner>;

//   if (bookings.length === 0) {
//     return (
//       <p className="text-center mt-10 text-gray-600">
//         You have no booked tickets yet.
//       </p>
//     );
//   }

//   return (
//     <Container>

    
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
//         My Booked Tickets
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-indigo-100 text-indigo-700">
//               <th className="py-3 px-4 text-left">Ticket ID</th>
//               <th className="py-3 px-4 text-left">Quantity</th>
//               <th className="py-3 px-4 text-left">Status</th>
//               <th className="py-3 px-4 text-left">Booked At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking._id} className="border-t hover:bg-gray-50">
//                <td className="py-2 px-4">{booking.ticketId.slice(-6)}</td>

//                 <td className="py-2 px-4">{booking.quantity}</td>
//                 <td className="py-2 px-4">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       booking.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : booking.status === "Approved"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {booking.status}
//                   </span>
//                 </td>
//                 <td className="py-2 px-4">
//                   {new Date(booking.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </Container>
//   );
// };

// export default MyBookedTickets;


// import { useEffect, useState } from "react";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import toast from "react-hot-toast";

const MyBookedTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then(async (bookingsData) => {
        // For each booking, fetch ticket details
        const enriched = await Promise.all(
          bookingsData.map(async (b) => {
            try {
              const tid = b.ticketId;
              const tRes = await fetch(`http://localhost:3000/tickets/${tid}`);
              const tJson = await tRes.json();
              return { ...b, ticket: tJson };
            } catch (err) {
              return { ...b, ticket: null };
            }
          })
        );
        setBookings(enriched);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch bookings.");
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  if (!bookings.length) {
    return <p className="text-center mt-10 text-gray-600">You have no booked tickets yet.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">My Booked Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bookings.map((b) => {
          const t = b.ticket;
          const total = (t?.price || 0) * b.quantity;
          const departure = t ? new Date(`${t.departureDate}T${t.departureTime}:00`) : null;
          const departurePassed = departure ? departure < new Date() : false;

          return (
            <div key={b._id} className="bg-white rounded shadow p-4">
              {t?.image ? <img src={t.image} alt={t.title} className="w-full h-36 object-cover rounded" /> : <div className="w-full h-36 bg-gray-100 rounded" />}
              <h3 className="mt-3 font-semibold">{t?.title || "Ticket removed"}</h3>
              <p className="text-sm text-gray-600">{t?.from} → {t?.to}</p>
              <p className="mt-2">Qty: <strong>{b.quantity}</strong></p>
              <p>Total: <strong>৳{total}</strong></p>
              <p className="text-sm text-gray-500">Departure: {t ? `${t.departureDate} ${t.departureTime}` : "N/A"}</p>

              <div className="mt-3">
                <span className={`px-2 py-1 rounded-full text-xs ${b.status === "Pending" ? "bg-yellow-100 text-yellow-800" : b.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {b.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {b.status === "Approved" && !departurePassed && (
                  <button className="w-full bg-green-600 text-white py-2 rounded">Pay Now</button>
                )}
                <button className="w-full bg-gray-200 py-2 rounded">View Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookedTickets;