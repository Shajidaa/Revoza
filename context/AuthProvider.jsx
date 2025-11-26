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
  //sign out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const value = {
    signInWithGoogle,
    user,
    setUser,
    loading,
    setLoading,
    logOut,
    logInFunc,
    createUserFunc,
    updateProfileUser,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
