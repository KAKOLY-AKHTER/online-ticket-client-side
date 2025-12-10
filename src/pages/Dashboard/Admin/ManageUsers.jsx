// import React, { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import { authFetch } from "../../../utils/api";

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";

export default function ManageUsers(){
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);

  const load = async () => {
    const token = await getToken();
    const data = await authFetch(`${import.meta.env.VITE_API_URL}/admin/users`, token);
    setUsers(data);
  };
  useEffect(()=>{ load(); }, []);

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
      <h2 className="text-2xl mb-4">Manage Users</h2>
      <table className="w-full bg-white rounded shadow">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(u=>(
            <tr key={u._id} className="border-b">
              <td>{u.name || '-'}</td>
              <td>{u.email}</td>
              <td>{u.role || 'user'}</td>
              <td className="flex gap-2">
                <button className="btn-primary" onClick={()=>patchRole(u._id, `${import.meta.env.VITE_API_URL}/admin/users/${u._id}/make-admin`)}>Make Admin</button>
                <button className="btn-secondary" onClick={()=>patchRole(u._id, `${import.meta.env.VITE_API_URL}/admin/users/${u._id}/make-vendor`)}>Make Vendor</button>
                {u.role === 'seller' && <button className="btn-danger" onClick={()=>markFraud(u._id)}>Mark Fraud</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
