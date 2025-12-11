
import { useEffect, useMemo, useState } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Link } from "react-router";


const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI controls
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [transportFilter, setTransportFilter] = useState("All");
  const [sortPrice, setSortPrice] = useState("none"); // none | asc | desc

  // pagination
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/tickets")
      .then((res) => res.json())
      .then((data) => {
       if (Array.isArray(data)) {
          setTickets(data);
        } else {
          console.warn("Invalid ticket data:", data);
          setTickets([]);
        }
        setLoading(false);

      })
      .catch((err) => {
        console.error("Error fetching tickets:", err);
        setTickets([]);

        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
 let arr = Array.isArray(tickets) ? [...tickets] : [];


    if (searchFrom.trim()) {
      arr = arr.filter((t) =>
        t.from?.toLowerCase().includes(searchFrom.trim().toLowerCase())
      );
    }

    if (searchTo.trim()) {
      arr = arr.filter((t) =>
        t.to?.toLowerCase().includes(searchTo.trim().toLowerCase())
      );
    }

    console.log(transportFilter);
    
    if (transportFilter !== "All") {
      arr = arr.filter((t) => t.transportType === transportFilter);
    }

    if (sortPrice === "asc") {
      arr.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "desc") {
      arr.sort((a, b) => b.price - a.price);
    }

    return arr;
  }, [tickets, searchFrom, searchTo, transportFilter, sortPrice]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Tickets</h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-center mb-6">
        <input
          value={searchFrom}
          onChange={(e) => setSearchFrom(e.target.value)}
          placeholder="From"
          className="px-3 py-2 border rounded w-full md:w-1/4"
        />
        <input
          value={searchTo}
          onChange={(e) => setSearchTo(e.target.value)}
          placeholder="To"
          className="px-3 py-2 border rounded w-full md:w-1/4"
        />

        <select
          value={transportFilter}
          onChange={(e) => setTransportFilter(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="All">All Transports</option>
          <option value="Bus">Bus</option>
          <option value="Train">Train</option>
          <option value="Plane">Plane</option>
          <option value="Launch">Launch</option>
        </select>

        <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="none">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pageData.map((t) => (
          <div key={t._id} className="bg-white rounded shadow p-4">
            <img src={t.image} alt={t.title} className="w-full bg-cover h-40 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-3">{t.title}</h3>
            <p className="text-sm text-gray-600">{t.from} → {t.to}</p>
            <p className="text-sm">Transport: {t.transportType}</p>
            <p className="font-bold mt-2">৳{t.price}</p>
            <p className="text-sm text-gray-600">Available: {t.quantity}</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {t.perks?.map((p, idx) => (
                <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                  {p}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Departure: {t.departureDate} {t.departureTime}
            </p>

            <Link to={`/tickets/${t._id}`} className="inline-block w-full text-center mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
              See Details
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>{page} / {totalPages || 1}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || totalPages === 0}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllTickets;
