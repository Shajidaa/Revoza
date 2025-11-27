"use client";

import { auth } from "@/app/firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  //google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  //create user
  const createUserFunc = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //update profile
  const updateProfileUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };
  //login
  const logInFunc = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // //sign out
  // const logOut = () => {
  //   setLoading(true);
  //   return signOut(auth);
  // };
  // Logout User - FIXED VERSION
  const logoutUser = async () => {
    setLoading(true);
    try {
      // Clear user state first
      setUser(null);

      // Sign out from Firebase
      await signOut(auth);

      // console.log("Firebase signout successful");
    } catch (error) {
      console.error("Firebase signout error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currUser) => {
  //     setUser(currUser);
  //     setLoading(false);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  // Auth State Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);

      // Set cookie based on auth state
      if (currentUser) {
        document.cookie =
          "userLoggedIn=true; path=/; samesite=lax; max-age=86400"; // 24 hours
      } else {
        document.cookie =
          "userLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    });

    return () => unsubscribe();
  }, []);
  const value = {
    signInWithGoogle,
    user,
    setUser,
    loading,
    setLoading,

    logInFunc,
    createUserFunc,
    updateProfileUser,
    logoutUser,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
