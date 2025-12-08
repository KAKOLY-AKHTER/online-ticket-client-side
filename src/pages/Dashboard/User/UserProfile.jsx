
import useAuth from '../../../hooks/useAuth';

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center gap-6">
          <img src={user?.photoURL || "/default-avatar.png"} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
          <div>
            <h3 className="text-xl font-semibold">{user?.displayName || "No name"}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        {/* role, other info can be fetched from your users collection */}
      </div>
    </div>
  );
};

export default UserProfile;