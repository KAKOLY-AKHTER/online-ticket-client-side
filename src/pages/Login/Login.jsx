import { Link, Navigate, useLocation, useNavigate } from "react-router"
import LoadingSpinner from "../../components/Shared/LoadingSpinner"
import toast from "react-hot-toast"
import { TbFidgetSpinner } from "react-icons/tb"
import { FcGoogle } from "react-icons/fc"
import useAuth from "../../hooks/useAuth"
import axios from "axios"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react"



const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading, resetPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />



  // form submit handler
  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {

      const loggedUser = await signIn(email, password);


      // ✅ Always get fresh token
      const token = await loggedUser.user.getIdToken(true);

      // ✅ Save in localStorage
      localStorage.setItem("access-token", token);
      localStorage.setItem("user-email", loggedUser.user.email);

      await axios.post("https://online-ticket-booking-azure.vercel.app/user", {
        email: loggedUser.user.email,
        name: loggedUser.user.displayName || loggedUser.user.email,
        photo: loggedUser.user.photoURL || "https://i.ibb.co/ZVFsg37/default-avatar.png",
      });


      const roleRes = await axios.get("https://online-ticket-booking-azure.vercel.app/user/role", {
        headers: { authorization: `Bearer ${token}` },
      });

      const role = roleRes.data.role;

      if (role === "admin") navigate("/dashboard/admin/profile");
      else if (role === "vendor") navigate("/dashboard/vendor/profile");
      else navigate("/dashboard/user/profile");




      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };



  // Handle Google Signin
  const handleGoogleSignIn = async () => {

    try {


      const loggedUser = await signInWithGoogle();

      const token = await loggedUser.user.getIdToken(true);
      localStorage.setItem("access-token", token);
      localStorage.setItem("user-email", loggedUser.user.email);

      await axios.post("https://online-ticket-booking-azure.vercel.app/user", {
        email: loggedUser.user.email,
        name: loggedUser.user.displayName,
        photo: loggedUser.user.photoURL,
      });



      // const token = await loggedUser.user.getIdToken(true);
      // localStorage.setItem("access-token", token);
      // localStorage.setItem("user-email", loggedUser.user.email);

      // Fetch role
      const roleRes = await axios.get("VITE_API_URL/user/role", {
        headers: { authorization: `Bearer ${token}` },
      });
      const role = roleRes.data.role;

      if (role === "admin") navigate("/dashboard/admin/profile");
      else if (role === "vendor") navigate("/dashboard/vendor/profile");
      else navigate("/dashboard/user/profile");

      toast.success("Login Successful");
    } catch (err) {
      console.log(err);

      toast.error(err?.message);
    }
  };


  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-2 cursor-pointer text-gray-600'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

          </div>

          <div>
            <button
              type='submit'
              className='bg-lime-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button
            onClick={async () => {
              const email = prompt("Enter your email to reset password:");

              if (!email) {
                return toast.error("Please enter your email!");
              }

              try {
                await resetPassword(email);
                toast.success("Password reset email sent!");
              } catch (err) {
                toast.error(err.message);
              }
            }}
            className='text-xs hover:underline hover:text-lime-500 text-gray-400 cursor-pointer'
          >
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            state={from}
            to='/signup'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login;







