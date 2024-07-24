/* eslint-disable no-undef */
import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Account</h1>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl">Welcome, {user.name}</h2>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Log out
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Account Details</h3>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <Link
            to="/change-password"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            Change Password
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Order History</h3>
          {orders.length === 0 ? (
            <p>You haven&apos;t placed any orders yet.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order.id} className="mb-2">
                  Order #{order.id} - {order.date} - ${order.total}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Addresses</h3>
          {addresses.length === 0 ? (
            <p>No addresses saved.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div key={address.id} className="border p-4 rounded">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p>{address.country}</p>
                </div>
              ))}
            </div>
          )}
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4">
            Add New Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
