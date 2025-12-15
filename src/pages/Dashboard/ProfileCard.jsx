export default function ProfileCard({ user }) {
  return (
    <div className="bg-white p-8 shadow-lg rounded-xl max-w-lg mx-auto">
      <div className="flex flex-col items-center text-center">
        
        <img
          src={user?.photoURL || user?.photo || "/default-avatar.png"}
          alt="profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
        />

        <h2 className="text-2xl text-green-600 font-bold mt-4">
          {user?.name || user?.displayName}
        </h2>
        <p className="text-gray-500">{user?.email}</p>

        <span className="mt-3 inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
          Role: {user?.role || "user"}
        </span>

      
      </div>
    </div>

  );
}