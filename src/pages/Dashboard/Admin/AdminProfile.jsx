import useAuth from "../../../hooks/useAuth";
import ProfileCard from "../ProfileCard";


export default function AdminProfile() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>
      <ProfileCard user={user} />
    </div>
  );
}
