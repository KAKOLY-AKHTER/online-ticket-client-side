import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../../assets/images/logo.png";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3"><img className="w-12 " src={logo} alt="" /> TicketBari</h2>
          <p className="text-sm leading-relaxed">
          Seamless booking for bus, train, launch & flights — all in one place.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/tickets" className="hover:text-blue-400">All Tickets</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Info</h3>
          <p>Email: <a href="mailto:support@ticketbari.com" className="hover:text-blue-400">support@ticketbari.com</a></p>
          <p>Phone: <span className="hover:text-blue-400">+880 1234 567890</span></p>
          <p>Facebook: <a href="https://www.facebook.com/kakoly.akhter.80142" target="_blank" rel="noreferrer" className="hover:text-blue-500">TicketBari Page</a></p>
        </div>

        {/* Column 4: Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Payment Methods</h3>
          <p className="text-sm">We accept secure payments via Stripe.</p>
          <img
            src="https://e7.pngegg.com/pngimages/321/810/png-clipart-stripe-payment-logo-tech-companies-thumbnail.png"
            alt="Stripe"
            className="h-8 mt-2"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 text-center py-4 text-sm text-gray-400">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
}
