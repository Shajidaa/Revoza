"use client";

import axios from "axios";
import { useContext, useEffect } from "react";

import { AuthContext } from "@/context/AuthProvider";

// Create a reusable Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
});

const useAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.accessToken) return; // don't attach interceptor if no user

    // REQUEST INTERCEPTOR
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status; // fix: get status from response
        if (status === 401 || status === 403) {
          await logOut();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when component unmounts or user changes
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut]);

  return axiosInstance;
};

export default useAxiosSecure;
