import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">🎟️ TicketBari</h2>
          <p className="text-sm leading-relaxed">
            Book, manage, and enjoy your tickets with ease.  
            A complete online ticket booking solution.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/tickets" className="hover:text-blue-400">All Tickets</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p>Email: <a href="mailto:support@ticketbari.com" className="hover:text-blue-400">support@ticketbari.com</a></p>
          <p>Phone: <span className="hover:text-blue-400">+880 1234 567890</span></p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://www.facebook.com/kakoly.akhter.80142" target="_blank" rel="noreferrer" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 1200 1227" className="w-5 h-5">
                <path d="M714.163 0h281.137L485.197 515.342 1050 1227H768.863L414.75 754.659 120.75 1227H0l432.75-711.658L0 0h120.75l294 472.341L714.163 0z"/>
              </svg>
            </a>

            <a href="https://www.instagram.com/akhter_kakoly?igsh=MW5tb3UzYXJ4amZhNQ%3D%3D" target="_blank" rel="noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/kakoly-akhter-27044a392/" target="_blank" rel="noreferrer" className="hover:text-blue-600"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} TicketBari. All rights reserved.
      </div>
    </footer>
  );
}
