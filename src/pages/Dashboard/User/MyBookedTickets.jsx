


import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const MyBookedTickets = () => {
  const axios = useAxiosSecure();
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);

  // useEffect(() => {


  //   if (user?.email) {
  //     const token = localStorage.getItem("access-token");
  //     axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //       .then((res) => {
  //         setTickets(res.data || []);
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching bookings:", err);
  //         setTickets([]);
  //       });

  //   }
  // }, [user]);

  useEffect(() => {
  const fetchWithTicketInfo = async () => {
    if (user?.email) {
      const token = localStorage.getItem("access-token");
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const bookings = res.data || [];

        // fetch ticket info for each booking
        const enriched = await Promise.all(bookings.map(async (b) => {
          const ticketRes = await axios.get(`${import.meta.env.VITE_API_URL}/tickets/${b.ticketId}`);
          return {
            ...b,
            ticketInfo: ticketRes.data
          };
        }));

        setTickets(enriched);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setTickets([]);
      }
    }
  };

  fetchWithTicketInfo();
}, [user]);



  const getCountdown = (date, time) => {
    const now = new Date().getTime();
    const event = new Date(`${date}T${time}:00Z`).getTime();

    const diff = event - now;
    if (diff <= 0) return "Expired";

    const h = Math.floor(diff / (1000 * 60 * 60));
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));

    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${d}d ${h}h ${m}m`;
  };

  return (


    <div className="p-6 grid md:grid-cols-3 gap-6">
      {Array.isArray(tickets) && tickets.map((item) => {
        const countdown = getCountdown(item.departureDate, item.departureTime);
        console.log("Countdown input:", item.departureDate, item.departureTime);


        const expired = countdown === "Expired";

        return (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-900 shadow rounded-xl p-4"
          >
            <img
              src={item.image}
              className="rounded-lg h-40 w-full object-cover"
            />

            <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>

            <p className="text-gray-600 dark:text-gray-300">
              {item.from} → {item.to}
            </p>

            {/* <p className="mt-2 font-semibold">
              Quantity: {item.quantity}
            </p> */}
  <p className="mt-2 font-semibold">
          Quantity: {item.quantity}
          <span className="text-sm text-sky-500 ml-2">
            Left: {item.ticketInfo?.quantity ?? "?"}
          </span>
        </p>



            <p className="font-bold text-indigo-600">
              Total: ${item.totalPrice}
            </p>

            <p className="mt-1">Departure: {item.departureDate} {item.departureTime}</p>


 

                          {/* STATUS BADGE */}
              <span
                className={`inline-block px-4 py-1 rounded mt-2 text-white
                  ${
                    expired
                      ? "bg-gray-500"
                      : item.status === "pending"
                      ? "bg-pink-500"
                      : item.status === "accepted"
                      ? "bg-blue-500"
                      : item.status === "paid"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
              >
                {expired ? "Payment Closed" : item.status}
              </span>


             {/* COUNTDOWN */}
              {item.status !== "rejected" && (
                <p className="mt-2 text-orange-500 font-semibold">
                  Countdown: {countdown}
                </p>
              )}


                  {/* PAY BUTTON */}

             {item.status === "accepted" && (
  expired ? (
    <button className="btn w-full mt-3 bg-gray-400 cursor-not-allowed">
      Payment Closed
    </button>
  ) : (
    <Link
      to={`/dashboard/payment/${item._id}`}
      className="btn btn-primary w-full mt-3"
    >
      Pay Now
    </Link>
  )
)}


          </div>
        );
      })}
    </div>
  );
};

export default MyBookedTickets;




