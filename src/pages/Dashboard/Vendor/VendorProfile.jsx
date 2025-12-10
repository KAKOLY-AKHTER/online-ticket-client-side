// import { useAuth } from "../../hooks/useAuth";
// import ProfileCard from "../../components/ProfileCard";

import useAuth from "../../../hooks/useAuth";
import ProfileCard from "../ProfileCard";

export default function VendorProfile() {
  const { user } = useAuth(); // user data: name, email, role, photoURL

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vendor Profile</h1>
      <ProfileCard user={user} />
    </div>
  );
}