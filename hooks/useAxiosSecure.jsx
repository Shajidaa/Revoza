"use client";

import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthProvider";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

const useAxiosSecure = () => {
  const { user, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.accessToken) return;

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          await logoutUser();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logoutUser]);

  return axiosInstance;
};

export default useAxiosSecure;
