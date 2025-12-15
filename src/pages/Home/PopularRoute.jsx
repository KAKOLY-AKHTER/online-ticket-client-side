"use client";
import { FaBusAlt, FaTrain, FaPlane } from "react-icons/fa";

const routes = [
  {
    id: 1,
    from: "Dhaka",
    to: "Chittagong",
    type: "Bus",
    price: 750,
    icon: <FaBusAlt className="text-3xl text-blue-500" />,
  },
  {
    id: 2,
    from: "Dhaka",
    to: "Cox's Bazar",
    type: "Flight",
    price: 5500,
    icon: <FaPlane className="text-3xl text-yellow-400" />,
  },
  {
    id: 3,
    from: "Dhaka",
    to: "Sylhet",
    type: "Train",
    price: 450,
    icon: <FaTrain className="text-3xl text-green-500" />,
  },
  {
    id: 4,
    from: "Chittagong",
    to: "Cox's Bazar",
    type: "Bus",
    price: 320,
    icon: <FaBusAlt className="text-3xl text-blue-500" />,
  },
];

const PopularRoute = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl text-sky-600 font-bold text-center mb-10">
        Popular Routes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {routes.map((route) => (
          <div
            key={route.id}
            className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              {route.icon}
              <h3 className="text-xl text-pink-700 font-semibold">
                {route.from} → {route.to}
              </h3>
            </div>

            <p className="text-gray-600 mb-2">Transport: {route.type}</p>

            <p className="font-bold text-blue-400 text-lg mb-4">
              Starting from: {route.price} BDT
            </p>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoute;
