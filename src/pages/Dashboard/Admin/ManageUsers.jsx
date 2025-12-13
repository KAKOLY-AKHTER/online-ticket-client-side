

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";

export default function ManageUsers() {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);

  const load = async () => {
    const token = await getToken();
    const data = await authFetch(`${import.meta.env.VITE_API_URL}/admin/users`, token);
    setUsers(data);
  };
  useEffect(() => { load(); }, []);

  const patchRole = async (id, url) => {
    const token = await getToken();
    await authFetch(url, token, { method: 'PATCH' });
    load();
  };

  const markFraud = async (id) => {
    const token = await getToken();
    await authFetch(`${import.meta.env.VITE_API_URL}/admin/users/${id}/mark-fraud`, token, { method: 'PATCH' });
    load();
  };

  return (
    <div>
      <h2 className="text-2xl mb-4 text-sky-500 font-bold">Manage Users</h2>
     <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden shadow-md">
  <thead className="bg-blue-100 text-blue-800 font-semibold">
    <tr>
      <th className="px-4 py-3">Name</th>
      <th className="px-4 py-3">Email</th>
      <th className="px-4 py-3">Role</th>
      <th className="px-4 py-3 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map(u => (
      <tr key={u._id} className="border-t hover:bg-gray-50 transition">
        <td className="px-4 py-2 font-medium">{u.name || '-'}</td>
        <td className="px-4 py-2 text-sm text-gray-600">{u.email}</td>
        <td className="px-4 py-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            u.role === 'admin' ? 'bg-green-100 text-green-700' :
            u.role === 'vendor' ? 'bg-purple-100 text-purple-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {u.role || 'user'}
          </span>
        </td>
        <td className="px-4 py-2 flex flex-wrap gap-2 justify-center">
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => patchRole(u._id, `${import.meta.env.VITE_API_URL}/admin/users/${u._id}/make-admin`)}
          >
            Make Admin
          </button>
          <button
            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={() => patchRole(u._id, `${import.meta.env.VITE_API_URL}/admin/users/${u._id}/make-vendor`)}
          >
            Make Vendor
          </button>
          {u.role === 'vendor' && (
            <button
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => markFraud(u._id)}
            >
              Mark Fraud
            </button>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
