import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const Profile = ({ user }) => {

  const { logout } = useContext(AuthContext);       // logout function imported

  // handling logout ( refer doc mentioned in AuthProvider.js)
  const handleLogout = () => {
    logout().then((result) => {
      alert("Logging Out");
      window.location.reload();     // refresh the window
    });
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">

        {/* Page content here */}
        <label 
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            {
                user?.photoURL ? (
                    <img alt="" src={user?.photoURL} />
                ) : 
                (
                    <img src="/images/home/userProfile.jpg" />
                )
            }
          </div>

        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">

          {/* Sidebar content here */}
          <li>
            <a href="/update-profile">Profile</a>
          </li>
          <li>
            <a href="/order">Orders</a>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a>Setting</a>
          </li>
          <li>
            <a onClick={handleLogout}>LogOut</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;