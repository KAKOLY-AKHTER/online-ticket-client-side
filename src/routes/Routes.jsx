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
import VendorProfile from "../pages/Dashboard/Vendor/VendorProfile";
import AddTicket from "../pages/Dashboard/Vendor/AddTicket";
import MyAddedTickets from "../pages/Dashboard/Vendor/MyAddedTickets";
import RequestedBookings from "../pages/Dashboard/Vendor/RequestedBookings";
import RevenueOverview from "../pages/Dashboard/Vendor/RevenueOverview";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageTickets from "../pages/Dashboard/Admin/ManageTickets";
import AdvertiseTickets from "../pages/Home/Advertisement";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Contact from "../pages/static/Contact";
import About from "../pages/static/About";
import DashboardOverview from "../layouts/DashboardOverview";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/Payment/PaymentSuccess"
import TransactionHistory from "../pages/Dashboard/User/TransactionHistory"
import AdminRoute from "./AdminRoute";
import VendorRoute from "./VendorRoute";
import UpdateTicket from "../pages/Dashboard/Vendor/Update/UpdateTickets";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "/tickets", element: <PrivateRoute>
          <AllTickets></AllTickets>
        </PrivateRoute>
      },
      {
        path: "/tickets/:id", element: <PrivateRoute>
          <TicketDetails></TicketDetails>
        </PrivateRoute>
      },



      { path: "/login", element: <Login></Login> },
      { path: "/signup", element: <SignUp></SignUp> },

      { path: "/contact", element: <Contact></Contact> },
      { path: "/about", element: <About></About> },


    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardOverview /> },
      // User Dashboard
      { path: "user/profile", element: <UserProfile /> },
      {path: "user/transactions",element: <TransactionHistory/>  },

      { path: "user/my-booked-tickets", element: <MyBookedTickets /> },
 

    // Payment Routes
      { path: "payment/:bookingId", element: <Payment /> },
      { path: "payment-success", element: <PaymentSuccess></PaymentSuccess> },
 // Vendor Dashboard (Protected)
      {
        path: "vendor/profile",
        element: (
          <VendorRoute>
            <VendorProfile />
          </VendorRoute>
        ),
      },
      {
        path: "vendor/add-ticket",
        element: (
          <VendorRoute>
            <AddTicket />
          </VendorRoute>
        ),
      },
      {
        path: "vendor/my-added-tickets",
        element: (
          <VendorRoute>
            <MyAddedTickets />
          </VendorRoute>
        ),
      },
      {
        path: "/dashboard/vendor/update-ticket/:id",
        element: (
          <VendorRoute>
          <UpdateTicket></UpdateTicket>
          </VendorRoute>
        ),
      },


     

      {
        path: "vendor/requested-bookings",
        element: (
          <VendorRoute>
            <RequestedBookings />
          </VendorRoute>
        ),
      },
      {
        path: "vendor/revenue",
        element: (
          <VendorRoute>
            <RevenueOverview />
          </VendorRoute>
        ),
      },

      // Admin Dashboard (Protected)
      {
        path: "admin/profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-tickets",
        element: (
          <AdminRoute>
            <ManageTickets />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/advertise-tickets",
        element: (
          <AdminRoute>
            <AdvertiseTickets />
          </AdminRoute>
        ),
      },

    ],
  },
]);
