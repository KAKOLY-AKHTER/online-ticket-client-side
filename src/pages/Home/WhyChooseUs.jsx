"use client";
import { FaShieldAlt, FaClock, FaTags, FaHeadset } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Fast & Secure Booking",
    desc: "Book any ticket within seconds with top-level security.",
    icon: <FaClock className="text-4xl text-blue-500" />,
  },
  {
    id: 2,
    title: "Verified Transport Partners",
    desc: "We provide tickets from trusted and verified providers only.",
    icon: <FaShieldAlt className="text-4xl text-green-500" />,
  },
  {
    id: 3,
    title: "Best Price Guarantee",
    desc: "Get the best deals and save money on every ride.",
    icon: <FaTags className="text-4xl text-yellow-500" />,
  },
  {
    id: 4,
    title: "24/7 Customer Support",
    desc: "Our team is ready to help you anytime, anywhere.",
    icon: <FaHeadset className="text-4xl text-purple-500" />,
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl border transition"
            >
              <div className="flex items-center justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="text-xl text-pink-600 font-semibold text-center mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
