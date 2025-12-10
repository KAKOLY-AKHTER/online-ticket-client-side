import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/UseRole";
import ProfileCard from "../ProfileCard";


export default function AdminProfile() {
  const { user } = useAuth();
    const { role } = useRole();

const enrichedUser = {
    ...user,
    role,
  };


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>
      <ProfileCard user={enrichedUser} />
    </div>
  );
}
