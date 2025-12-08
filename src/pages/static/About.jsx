import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          About Us
        </h1>

        {/* Section 1 */}
        <div className="bg-white p-8 shadow-lg rounded-xl mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We are a dedicated team focused on providing high-quality services.
            Our goal is to ensure customer satisfaction with clean, modern
            design and seamless user experience. With years of experience in
            development, design, and business solutions, we help brands grow.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white p-8 shadow-lg rounded-xl mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to deliver reliable and user-friendly digital
            products. We believe in innovation, dedication, and trust. We work
            closely with our clients to build solutions that truly make an
            impact.
          </p>
        </div>

        {/* Team Section */}
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Meet Our Team
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((member) => (
            <div
              key={member}
              className="bg-white shadow-lg p-6 rounded-xl text-center"
            >
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-800">Member {member}</h3>
              <p className="text-gray-500">Web Developer</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;