import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

    // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];


    
    // password validation
    if (password.length < 6)
      return toast.error("Password must contain at least 6 characters");
    if (!/[A-Z]/.test(password))
      return toast.error("Password must contain at least 1 uppercase letter");
    if (!/[0-9]/.test(password))
      return toast.error("Password must contain at least 1 number");
    if (!/[!@#$%^&*]/.test(password))
      return toast.error("Password must contain at least 1 special character");

    try {

      
  const img_API_URL = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMGBB_KEY
  }`;
  
  // Image upload function
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(img_API_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data?.data?.display_url; // uploaded image URL
  };


      // 1. Upload Image (if exists)
      let imageURL = "";
      if (image) {
        imageURL = await uploadImageToImgBB(image);
      }

      // 2. Create User
      const result = await createUser(email, password);
        // Get Firebase token
      const token = await result.user.getIdToken(true);
      localStorage.setItem("access-token", token);

      // 3. Update profile with dynamic image
      await updateUserProfile(
        name,
        imageURL || "https://i.ibb.co/ZVFsg37/default-avatar.png"
      );

        await axios.post("http://localhost:3000/user", { email, name, photo: imageURL });

      // Fetch role
      const roleRes = await axios.get("http://localhost:3000/user/role", {
        headers: { authorization: `Bearer ${token}` },
      });

      const role = roleRes.data.role;
      if (role === "admin") navigate("/dashboard/admin/profile");
      else if (role === "vendor") navigate("/dashboard/vendor/profile");
      else navigate("/dashboard/user/profile");


      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await signInWithGoogle();
  //     navigate(from, { replace: true });
  //     toast.success("Signup Successful");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err?.message);
  //   }
  // };

    const handleGoogleSignIn = async () => {
    try {
     
      const loggedUser = await signInWithGoogle();
      const token = await loggedUser.user.getIdToken(true);
      localStorage.setItem("access-token", token);

      // Save user to backend
      await axios.post("http://localhost:3000/user", {
        email: loggedUser.user.email,
        name: loggedUser.user.displayName,
        photo: loggedUser.user.photoURL,
      });

      // Fetch role
      const roleRes = await axios.get("http://localhost:3000/user/role", {
        headers: { authorization: `Bearer ${token}` },
      });

      const role = roleRes.data.role;
      if (role === "admin") navigate("/dashboard/admin/profile");
      else if (role === "vendor") navigate("/dashboard/vendor/profile");
      else navigate("/dashboard/user/profile");

      toast.success("Signup Successful");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Google Signup Failed");
    
    }
  };


  

  return (
    <div className="flex justify-center items-center p-6 min-h-screen bg-white">
      <div className="flex flex-col w-full max-w-xl mx-auto p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to online ticket booking</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 ng-untouched  ng-pristine ng-valid w-full px-6 py-4 bg-white rounded-lg shadow"
        >
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block mb-2 text-sm">Profile Image</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 
                file:bg-lime-50 file:text-lime-700 file:px-4 file:py-2 file:rounded-md
                bg-gray-100 border border-dashed border-lime-300 rounded-md cursor-pointer py-2"
              />
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>

            <div>
              <label className="block mb-2 text-sm">Email address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200"
              />
            </div>

            <div>
              <label className="text-sm mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-lime-500 w-full rounded-md py-3 text-white"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="hover:text-lime-500">
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
