
import logo from '../../../assets/images/logo.png'
import { GrLogout } from "react-icons/gr";
import { MdOutlinePayment } from "react-icons/md";
import { BiHistory } from "react-icons/bi";
import { FiUsers, FiCheckSquare } from "react-icons/fi";

import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/UseRole";
import { Link, NavLink } from "react-router";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import { TbBrandStripe, TbTicket } from "react-icons/tb";

const Sidebar = () => {
  const { logOut } = useAuth();
 const { role, isRoleLoading } = useRole();

console.log(role);
console.log(isRoleLoading);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-300 transition";
  const activeClass = ({ isActive }) =>
    isActive ? `${linkClass} bg-gray-300 font-semibold` : linkClass;

  if (isRoleLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse h-6 w-32 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <>
      {/* ======= Mobile Top Bar ======= */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden shadow">
        <div className="p-3">
          <Link to="/">
            <img src={logo} alt="logo" className="h-10" />
          </Link>
        </div>

        <button
          onClick={toggleSidebar}
          className="p-4 focus:outline-none focus:bg-gray-300"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* ======= Sidebar ======= */}
      <aside
        className={`
          z-20 fixed inset-y-0 left-0 w-64 bg-gray-100 shadow-xl 
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static transition-transform duration-200
          flex flex-col justify-between px-3 py-4
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo (Desktop Only) */}
          <div className="hidden md:flex justify-center py-3 rounded-xl bg-lime-100 shadow">
            <img src={logo} alt="logo" className="h-14" />
          </div>

          {/* Menu */}
          <nav className="flex-1 mt-6 space-y-1">
            {/* Common Link */}
            <NavLink to="/dashboard" className={activeClass}>
              <BsGraphUp />
              <span>Dashboard Overview</span>
            </NavLink>

            {/* USER MENU */}
            {role === "user" && (
              <>
                <NavLink to="/dashboard/user/profile" className={activeClass}>
                  <FcSettings /> User Profile
                </NavLink>

                <NavLink
                  to="/dashboard/user/my-booked-tickets"
                  className={activeClass}
                >
                  <TbTicket /> My Booked Tickets
                </NavLink>

                <NavLink
                  to="/dashboard/user/transactions"
                  className={activeClass}
                >
                  <BiHistory /> Transaction History
                </NavLink>

               
              </>
            )}

            {/* VENDOR MENU */}
            {role === "vendor" && (
              <>
                <NavLink to="/dashboard/vendor/profile" className={activeClass}>
                  <FcSettings /> Vendor Profile
                </NavLink>

                <NavLink
                  to="/dashboard/vendor/add-ticket"
                  className={activeClass}
                >
                  <TbTicket /> Add Ticket
                </NavLink>

                <NavLink
                  to="/dashboard/vendor/my-added-tickets"
                  className={activeClass}
                >
                  <TbTicket /> My Added Tickets
                </NavLink>

                <NavLink
                  to="/dashboard/vendor/requested-bookings"
                  className={activeClass}
                >
                  <FiCheckSquare /> Requested Bookings
                </NavLink>

                <NavLink
                  to="/dashboard/vendor/revenue"
                  className={activeClass}
                >
                  <BsGraphUp /> Revenue Overview
                </NavLink>
              </>
            )}

            {/* ADMIN MENU */}
            {role === "admin" && (
              <>
                <NavLink to="/dashboard/admin/profile" className={activeClass}>
                  <FcSettings /> Admin Profile
                </NavLink>

                <NavLink
                  to="/dashboard/admin/manage-tickets"
                  className={activeClass}
                >
                  <TbTicket /> Manage Tickets
                </NavLink>

                <NavLink
                  to="/dashboard/admin/manage-users"
                  className={activeClass}
                >
                  <FiUsers /> Manage Users
                </NavLink>

                <NavLink
                  to="/dashboard/admin/advertise-tickets"
                  className={activeClass}
                >
                  <TbBrandStripe /> Advertise Tickets
                </NavLink>
              </>
            )}
          </nav>

          {/* Bottom Section */}
          <div className="mt-3">
            <hr className="mb-3" />

            <NavLink
              to={
                role === "admin"
                  ? "/dashboard/admin/profile"
                  : role === "vendor"
                  ? "/dashboard/vendor/profile"
                  : "/dashboard/user/profile"
              }
              className={activeClass}
            >
              <FcSettings /> Profile
            </NavLink>

            <button
              onClick={logOut}
              className="flex w-full items-center gap-3 px-4 py-2 mt-3 
              bg-red-500 text-white hover:bg-red-600 transition rounded-lg shadow"
            >
              <GrLogout />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;