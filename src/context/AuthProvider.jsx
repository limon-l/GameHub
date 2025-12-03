import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
  signInWithCustomToken,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. Try to use the environment's specific token
        // eslint-disable-next-line no-undef
        const initialToken =
          typeof __initial_auth_token !== "undefined"
            ? __initial_auth_token
            : window.__initial_auth_token;

        if (initialToken) {
          await signInWithCustomToken(auth, initialToken);
        }
      } catch (error) {
        console.error(
          "Environment Auth failed. Clearing stale session...",
          error
        );
        // 2. CRITICAL FIX: If the environment token fails, force sign out.
        // This fixes the "400 Bad Request" / "Permission Denied" loop.
        await signOut(auth);
      }
    };

    initAuth();

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

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("user_loggedin");
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    if (!auth.currentUser) return Promise.reject(new Error("No user"));
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    }).then(() => {
      setUser((prevUser) => ({
        ...prevUser,
        displayName: name,
        photoURL: photo,
      }));
    });
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
