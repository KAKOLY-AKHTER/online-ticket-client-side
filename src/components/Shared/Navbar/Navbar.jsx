
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Container from "../Container";
import { Link } from "react-router";
import { AiOutlineMenu } from "react-icons/ai";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo.png";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

  useEffect(() => {
    const html = document.querySelector('html')
    html.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="fixed w-full z-10 shadow-md 
      bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white
      dark:bg-gray-800 dark:text-gray-200 transition-colors">

      <div className="py-4">
        <Container>
          <div className="flex items-center gap-4 justify-between">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" width="40" height="40" />
              <span className="text-xl font-bold">TicketBari</span>
            </Link>

            {/* MIDDLE MENU */}
            <div className="hidden md:flex flex-1 justify-center gap-6">
              <Link to="/" className="hover:text-yellow-300 font-semibold">Home</Link>

              {user && (
                <>
                  <Link to="/tickets" className="hover:text-yellow-300 font-semibold">All Tickets</Link>
              
                  <Link to="/dashboard" className="hover:text-yellow-300 font-semibold">Dashboard</Link>
                </>
              )}
            </div>

            {/* RIGHT SECTION */}
            <div className="hidden gap-5  md:flex items-center justify-center">

              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="mb-3 text-xl rounded-full w-full  dark:bg-gray-700 flex justify-center"
              >
                {theme === "light" ? <BsMoon /> : <BsSun />}
              </button>


              {/* AVATAR / LOGIN */}
              {user ? (
                <div className="relative">
                  <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img
                      className="rounded-full border-2 border-white"
                      src={user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                      height="35"
                      width="35"
                    />
                    <span className="font-semibold">{user.displayName || "User"}</span>
                  </div>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg 
                      bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200">
                      <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700">
                        My Profile
                      </Link>
                      <div
                        onClick={logOut}
                        className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        Logout
                      </div>
                    </div>
                  )}
                </div>
              ) : (
               <div className="flex items-center gap-4">
  <Link to="/login" className="hover:text-yellow-300 font-semibold">Login</Link>
  <Link to="/signup" className="hover:text-yellow-300 font-semibold">Register</Link>
</div>

              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-md border border-white"
              >
                <AiOutlineMenu />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-14 w-56 rounded-md shadow-lg p-4
                  bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200">



                  {user && (
                    <div className="flex flex-col items-center mb-4">
                      <img
                        className="rounded-full border-2 border-blue-600"
                        src={user.photoURL ? user.photoURL : avatarImg}
                        height="50"
                        width="50"
                      />
                      <span className="mt-2 font-semibold">{user.displayName || "User"}</span>
                    </div>
                  )}

                  <Link to="/" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700">Home</Link>

                  {user ? (
                    <>
                      <Link to="/tickets" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700">All Tickets</Link>
                      
                      <Link to="/dashboard" className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700">Dashboard</Link>
                     <Link
                        to="/dashboard/user/profile"
                        className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700"
                      >
                        My Profile
                      </Link>


                      <div
                        onClick={logOut}
                        className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-4">
  <Link to="/login" className="hover:text-yellow-300 font-semibold">Login</Link>
  <Link to="/signup" className="hover:text-yellow-300 font-semibold">Register</Link>
</div>


                  )}

                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
