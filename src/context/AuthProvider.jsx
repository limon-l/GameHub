import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem("user_loggedin", "true");
      } else {
        localStorage.removeItem("user_loggedin");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    localStorage.removeItem("user_loggedin");
    await signOut(auth);
    setLoading(false);
  };

  const updateUserProfile = async (name, photo) => {
    if (!auth.currentUser) return Promise.reject(new Error("No user"));

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });

    setUser((prev) => ({
      ...prev,
      displayName: name,
      photoURL: photo,
    }));
  };

  const authInfo = {
    user,
    loading,
    logOut,
    updateUserProfile,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
