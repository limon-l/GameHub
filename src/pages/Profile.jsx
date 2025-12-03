import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Container from "../components/Container";
import {
  FaUserCircle,
  FaEdit,
  FaCamera,
  FaLink,
  FaSave,
  FaTimes,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getApp } from "firebase/app";

const Profile = () => {
  const { user, loading, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("link");
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.photoURL || "");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setPreviewUrl(user.photoURL || "");
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalPhotoURL = photoURL;

      if (activeTab === "upload" && imageFile) {
        try {
          const app = getApp();
          const storage = getStorage(app);
          const fileName = `${user.uid}_${Date.now()}_${imageFile.name}`;
          const storageRef = ref(
            storage,
            `profile_photos/${user.uid}/${fileName}`
          );

          await uploadBytes(storageRef, imageFile);
          finalPhotoURL = await getDownloadURL(storageRef);
        } catch (storageError) {
          console.error("Storage Error:", storageError);
          toast.error(`Image upload failed: ${storageError.message}`);
          setIsUploading(false);
          return;
        }
      } else if (activeTab === "link") {
        finalPhotoURL = photoURL;
      }

      await updateUserProfile(displayName, finalPhotoURL);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="loading loading-spinner loading-lg text-green-700"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 relative overflow-hidden">
      <Helmet>
        <title>My Profile | GameHub</title>
      </Helmet>
      <div className="absolute top-0 left-0 w-full h-96 bg-green-800 rounded-b-[3rem] shadow-2xl z-0"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-20 w-80 h-80 bg-green-400/20 rounded-full blur-3xl"></div>
      <Container className="relative z-10 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/50">
            <div className="relative pt-12 pb-8 px-8 text-center border-b border-gray-100">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative inline-block">
                <div className="w-40 h-40 rounded-full p-1 bg-green-600 shadow-xl mx-auto">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-gray-200">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="w-full h-full text-gray-400" />
                    )}
                  </div>
                </div>
                {isEditing && (
                  <label
                    htmlFor="file-upload"
                    className="absolute bottom-2 right-2 bg-white text-green-700 p-3 rounded-full shadow-lg cursor-pointer hover:bg-green-50 transition-colors border border-gray-200">
                    <FaCamera />
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        setActiveTab("upload");
                        handleFileChange(e);
                      }}
                    />
                  </label>
                )}
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 mt-6 tracking-tight">
                {user.displayName || "Welcome, Gamer"}
              </h1>
              <p className="text-gray-500 font-medium">{user.email}</p>
              {!isEditing && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="mt-6 btn btn-outline border-green-600 text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600 rounded-full px-8 gap-2 font-bold">
                  <FaEdit /> Edit Profile
                </motion.button>
              )}
            </div>
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-50/50">
                  <form
                    onSubmit={handleProfileUpdate}
                    className="p-8 space-y-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold text-gray-700 text-base">
                          Display Name
                        </span>
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="input input-bordered w-full bg-white border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text font-bold text-gray-700 text-base">
                          Profile Picture
                        </span>
                      </label>
                      <div className="flex gap-4 mb-4">
                        <button
                          type="button"
                          onClick={() => setActiveTab("link")}
                          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all border ${
                            activeTab === "link"
                              ? "bg-green-600 text-white border-green-600 shadow-md"
                              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                          }`}>
                          <FaLink /> Link URL
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab("upload")}
                          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all border ${
                            activeTab === "upload"
                              ? "bg-green-600 text-white border-green-600 shadow-md"
                              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                          }`}>
                          <FaCloudUploadAlt /> Upload File
                        </button>
                      </div>
                      {activeTab === "link" ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}>
                          <input
                            type="text"
                            value={photoURL}
                            onChange={(e) => {
                              setPhotoURL(e.target.value);
                              setPreviewUrl(e.target.value);
                            }}
                            className="input input-bordered w-full bg-white border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl"
                            placeholder="https://example.com/avatar.jpg"
                          />
                          <p className="text-xs text-gray-500 mt-2 pl-1">
                            Paste a direct link to an image.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-green-50/50 hover:border-green-400 transition-colors cursor-pointer bg-white">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-drop"
                          />
                          <label
                            htmlFor="file-drop"
                            className="cursor-pointer w-full h-full block">
                            <FaCloudUploadAlt className="text-4xl text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 font-medium">
                              Click to select a file
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              JPG, PNG up to 2MB
                            </p>
                            {imageFile && (
                              <div className="mt-2 text-sm text-green-600 font-semibold bg-green-50 inline-block px-3 py-1 rounded-full">
                                Selected: {imageFile.name}
                              </div>
                            )}
                          </label>
                        </motion.div>
                      )}
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setPreviewUrl(user.photoURL);
                        }}
                        className="flex-1 btn btn-ghost text-gray-500 hover:bg-gray-100 rounded-xl"
                        disabled={isUploading}>
                        <FaTimes /> Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 btn bg-green-600 hover:bg-green-700 text-white border-0 rounded-xl shadow-lg hover:shadow-green-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={isUploading}>
                        {isUploading ? (
                          <div className="flex items-center justify-center gap-2">
                            <span className="loading loading-spinner loading-sm"></span>
                            <span>Saving...</span>
                          </div>
                        ) : (
                          <>
                            <FaSave /> Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 p-4 rounded-2xl shadow-sm text-center">
              <span className="block text-2xl font-bold text-gray-800">
                Member
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Status
              </span>
            </div>
            <div className="bg-white/80 p-4 rounded-2xl shadow-sm text-center">
              <span className="block text-2xl font-bold text-green-600">
                Active
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Account
              </span>
            </div>
            <div className="bg-white/80 p-4 rounded-2xl shadow-sm text-center">
              <span className="block text-2xl font-bold text-gray-800">
                {user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).getFullYear()
                  : "2023"}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Joined
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
