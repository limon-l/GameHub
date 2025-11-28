import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Container from "../components/Container";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user, loading, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    updateUserProfile(displayName, photoURL)
      .then(() => {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      })
      .catch((error) => {
        toast.error("Failed to update profile: " + error.message);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-green-700"></span>
      </div>
    );
  }

  return (
    <Container className="py-10 px-4">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        Your Profile
      </h2>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col items-center">
          <div className="avatar mb-4">
            <div className="w-32 rounded-full ring ring-green-700 ring-offset-base-100 ring-offset-2">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-300" />
              )}
            </div>
          </div>

          {!isEditing ? (
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-1">
                {user.displayName || "No Name Set"}
              </h3>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-ghost text-green-700">
                <FaEdit /> Edit Profile
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleProfileUpdate}
              className="w-full mt-4 space-y-4">
              <div>
                <label className="label text-green-800 font-semibold">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="input w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="label text-green-800 font-semibold">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="input w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Give your display photo's link"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Note: This only accepts a URL. File upload requires more
                  setup.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost w-1/2">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-green-700 hover:bg-green-800 text-white w-1/2">
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
