
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Container from "../../components/Shared/Container";

const LatestTickets = () => {
  const axios = useAxiosSecure();
  const [tickets, setTickets] = useState([]);
  // console.log(tickets);
  

useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_URL}/ticket/latest`)
    .then(res => {
      console.log(res.data); 
      setTickets(res.data || []);
    })
    .catch(err => console.error(err));
}, [axios]);

  return (
    <Container>



    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">Latest Tickets</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tickets.map(t => (
          <div key={t._id} className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 hover:shadow-lg transition">
            <img src={t.image} className="rounded-lg bg-cover h-40 w-full object-cover" />
            <h3 className="mt-3 text-xl text-pink-600 font-semibold">{t.title}</h3>
            <p className="text-gray-600">{t.transportType}</p>
            <p className="mt-1 text-sky-500">Price: ${t.price}</p>
            <p className="mt-1 text-green-800">Quantity: {t.quantity}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {t.perks?.map(p => (
                <span key={p} className="px-2 py-1 bg-green-100 text-green-700 rounded">{p}</span>
              ))}
            </div>
            <Link to={`/tickets/${t._id}`} className="btn btn-primary w-full mt-3">See details</Link>
          </div>
        ))}
      </div>
    </div>
        </Container>
  );
};

export default LatestTickets;
