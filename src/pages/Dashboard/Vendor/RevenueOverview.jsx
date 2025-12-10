// import React, { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import { authFetch } from "../../../utils/api";

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { authFetch } from "../../../Utils/api";

export default function RevenueOverview(){
  const { user, getToken } = useAuth();
  const [data, setData] = useState({ totalAdded:0, ticketsSold:0, totalRevenue:0 });

  useEffect(()=>{
    const load = async () => {
      try {
        const token = await getToken();
        const res = await authFetch(`${import.meta.env.VITE_API_URL}/vendor/revenue?email=${encodeURIComponent(user.email)}`, token);
        setData(res);
      } catch(err){ console.error(err); }
    };
    if(user) load();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Revenue Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-sm text-gray-500">Total Tickets Added</h3>
          <p className="text-2xl font-bold">{data.totalAdded}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-sm text-gray-500">Tickets Sold</h3>
          <p className="text-2xl font-bold">{data.ticketsSold}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-sm text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold">${data.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
}