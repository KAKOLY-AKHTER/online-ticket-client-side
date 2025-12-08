import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left - Form */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Send a Message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Message"
                className="w-full border px-4 py-3 rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
              ></textarea>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Send Message
              </button>
            </form>
          </div>

          {/* Right - Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Our Office</h3>

            <p className="text-gray-600 mb-2"><strong>Address:</strong> Mirpur, Dhaka, Bangladesh</p>
            <p className="text-gray-600 mb-2"><strong>Email:</strong> kakolyakhter48@gmail.com</p>
            <p className="text-gray-600 mb-6"><strong>Phone:</strong> +880 1234 567890</p>

            {/* Map Placeholder */}
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Google Map Here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;