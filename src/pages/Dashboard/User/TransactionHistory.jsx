import React from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const TransactionHistory = () => {
 const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: txns = [] } = useQuery({
        queryKey: ["transactions", user.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/transactions?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-sky-500 border-b pb-3 ">
        Transaction History
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="px-4 py-2 border text-pink-800">Transaction ID</th>
              <th className="px-4 py-2 border text-gray-900">Ticket Title</th>
              <th className="px-4 py-2 border text-green-500">Amount</th>
              <th className="px-4 py-2 border text-fuchsia-700">Date</th>
            </tr>
          </thead>

          <tbody>
            {txns.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              txns.map((t) => (
                <tr
                  key={t._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2 border font-mono text-sm text-blue-600">
                    {t.transactionId}
                  </td>
                  <td className="px-4 py-2 border text-gray-700">{t.title}</td>
                  <td className="px-4 py-2 border font-semibold text-green-600">
                    ${t.amount}
                  </td>
                  <td className="px-4 py-2 border text-gray-600">
                    {new Date(t.date).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

    );
}

export default TransactionHistory