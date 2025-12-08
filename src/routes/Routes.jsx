import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import AllTickets from "../pages/tickets/AllTickets";
import TicketDetails from "../pages/tickets/TicketDetails";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/Dashboard/User/UserProfile";
import MyBookedTickets from "../pages/Dashboard/User/MyBookedTickets";
import TransactionHistory from "../pages/Dashboard/User/TransactionHistory";
import VendorProfile from "../pages/Dashboard/Vendor/VendorProfile";
import AddTicket from "../pages/Dashboard/Vendor/AddTicket";
import MyAddedTickets from "../pages/Dashboard/Vendor/MyAddedTickets";
import RequestedBookings from "../pages/Dashboard/Vendor/RequestedBookings";
import RevenueOverview from "../pages/Dashboard/Vendor/RevenueOverview";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageTickets from "../pages/Dashboard/Admin/ManageTickets";
import AdvertiseTickets from "../pages/Dashboard/Admin/AdvertiseTickets";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Contact from "../pages/static/Contact";
import About from "../pages/static/About";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      { path: "/", element:<Home></Home> },
      { path: "/tickets", element: <AllTickets></AllTickets> },
      { path: "/tickets/:id", element: <TicketDetails></TicketDetails> },
    ],
  },
  { path: "/login", element: <Login></Login> },
  { path: "/signup", element: <SignUp></SignUp>},

  { path: "/contact", element: <Contact></Contact> },
  { path: "/about", element:<About></About>},

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // User Dashboard
      { path: "user/profile", element: <UserProfile/> },
      { path: "user/my-booked-tickets", element: <MyBookedTickets /> },
      { path: "user/transactions", element: <TransactionHistory /> },

      // Vendor Dashboard
      { path: "vendor/profile", element: <VendorProfile /> },
      { path: "vendor/add-ticket", element: <AddTicket /> },
      { path: "vendor/my-added-tickets", element: <MyAddedTickets /> },
      { path: "vendor/requested-bookings", element: <RequestedBookings /> },
      { path: "vendor/revenue", element: <RevenueOverview /> },

      // Admin Dashboard
      { path: "admin/profile", element: <AdminProfile /> },
      { path: "admin/manage-tickets", element: <ManageTickets /> },
      { path: "admin/manage-users", element: <ManageUsers /> },
      { path: "admin/advertise-tickets", element: <AdvertiseTickets /> },
    ],
  },
]);
