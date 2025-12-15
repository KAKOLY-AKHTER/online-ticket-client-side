import useAuth from "../../../hooks/useAuth";
import ProfileCard from "../ProfileCard";

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-sky-600">User Profile</h1>
      <ProfileCard user={user} />
    </div>
  );
}