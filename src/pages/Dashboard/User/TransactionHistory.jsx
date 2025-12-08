// import { useEffect, useState } from "react";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const TransactionHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/payments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setPayments(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch transactions");
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  if (!payments.length) {
    return <p className="text-center mt-10 text-gray-600">No transactions yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-indigo-100 text-indigo-700">
              <th className="px-4 py-2 text-left">Transaction ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Ticket Title</th>
              <th className="px-4 py-2 text-left">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="px-4 py-2">{p.transactionId || p._id}</td>
                <td className="px-4 py-2">৳{p.amount}</td>
                <td className="px-4 py-2">{p.ticketTitle}</td>
                <td className="px-4 py-2">{new Date(p.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;