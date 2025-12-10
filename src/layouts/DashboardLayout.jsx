import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className='min-h-screen bg-gray-100 md:flex'>
      {/* Left Side: Sidebar Component */}
      <div className="w-64 fixed inset-y-0 left-0 text-gray-800 bg-white z-50">
 <Sidebar></Sidebar>
      </div>

      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className='p-5'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout;
