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
        <div>
            <h2 className="text-3xl mb-5">Transaction History</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Ticket Title</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {txns.map(t => (
                        <tr key={t._id}>
                            <td>{t.transactionId}</td>
                            <td>{t.title}</td>
                            <td>${t.amount}</td>
                            <td>{new Date(t.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionHistory